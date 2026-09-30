import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact form called without RESEND_API_KEY configured');
    return NextResponse.json(
      { success: false, error: 'Email service is not configured yet.' },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 });
  }

  const fullName = clean(body.fullName, 120);
  const email = clean(body.email, 200);
  const projectType = clean(body.projectType, 60) || 'General';
  const message = clean(body.message, 5000);
  // Honeypot: real users leave this hidden field empty; bots fill it.
  const honeypot = clean(body.company, 200);

  if (honeypot) {
    // Silently accept to avoid tipping off spam bots.
    return NextResponse.json({ success: true });
  }

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { success: false, error: 'Please fill in your name, email, and message.' },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'framesbyaj@gmail.com';
  // Before verifying a domain in Resend, onboarding@resend.dev works for testing.
  // After verifying framesbyadrian.com, set CONTACT_FROM_EMAIL to e.g. hello@framesbyadrian.com.
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'FramesByAdrian <onboarding@resend.dev>';

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New enquiry: ${projectType} — ${fullName}`,
      text:
        `New contact form submission\n\n` +
        `Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Project type: ${projectType}\n\n` +
        `Message:\n${message}\n`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#111">
          <h2 style="margin:0 0 16px">New enquiry — ${escapeHtml(projectType)}</h2>
          <p style="margin:4px 0"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p style="margin:4px 0"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p style="margin:4px 0"><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
          <p style="white-space:pre-wrap;line-height:1.5">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend send error:', error);
      return NextResponse.json(
        { success: false, error: 'Could not send your message. Please try again or email us directly.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
