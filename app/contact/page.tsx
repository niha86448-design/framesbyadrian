'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Phone, Mail, CheckCircle2, Loader2, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectType: 'Sports',
    message: '',
    company: '', // honeypot — must stay empty
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Could not send your message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="relative z-50 min-h-screen pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto select-none">
      
      {/* Back Navigation Button */}
      <div className="relative z-50 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-ice-blue uppercase tracking-widest hover:text-white transition-colors cursor-hover bg-surface/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg pointer-events-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO HOME</span>
        </Link>
      </div>

      {/* Fade-in Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Header (Centered) */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-ice-blue uppercase tracking-widest bg-ice-blue/10 px-4 py-1.5 rounded-full border border-ice-blue/20">
            <MessageSquare className="w-4 h-4 text-ice-blue animate-pulse" />
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-white text-glow">
            Let's Create Together
          </h1>
          <p className="font-body text-text-muted text-lg mt-4 max-w-xl mx-auto">
            Every great image starts with a conversation.
          </p>
        </div>

        {/* Main Content Grid (1 col on mobile, 2 cols on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-5xl mx-auto px-4 md:px-6">
          
          {/* LEFT COLUMN: Contact Details */}
          <div className="space-y-8 flex flex-col justify-between">
            <div className="space-y-8">
              <h2 className="font-heading text-2xl font-bold text-white border-b border-white/10 pb-4">
                Direct Contact
              </h2>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-surface/80 border border-white/10 group-hover:border-ice-blue/50 group-hover:bg-ice-blue/10 transition-all flex items-center justify-center text-ice-blue shrink-0 shadow-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-text-muted block mb-1">
                    Call or WhatsApp
                  </span>
                  <a
                    href="tel:+918880656537"
                    className="text-xl text-white font-medium hover:text-ice-blue transition-colors cursor-hover inline-block"
                  >
                    +91 88806 56537
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-surface/80 border border-white/10 group-hover:border-ice-blue/50 group-hover:bg-ice-blue/10 transition-all flex items-center justify-center text-ice-blue shrink-0 shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-text-muted block mb-1">
                    Email Us
                  </span>
                  <a
                    href="mailto:framesbyaj@gmail.com"
                    className="text-xl text-white font-medium hover:text-ice-blue transition-colors cursor-hover inline-block"
                  >
                    framesbyaj@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Note */}
            <div className="mt-8 border-l-2 border-ice-blue/40 pl-4 py-1">
              <p className="text-sm text-text-muted/80 italic font-body">
                Typically responds within 24 hours.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="bg-surface/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                /* SUCCESS STATE */
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-16 text-center space-y-4 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-ice-blue/20 border border-ice-blue/50 flex items-center justify-center text-ice-blue shadow-[0_0_30px_rgba(0,212,255,0.4)] animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white">
                    Message Sent Successfully
                  </h3>
                  <p className="text-sm font-mono text-text-muted max-w-xs">
                    We'll be in touch soon. Thank you for reaching out!
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setErrorMsg('');
                      setFormData({
                        fullName: '',
                        email: '',
                        projectType: 'Sports',
                        message: '',
                        company: '',
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-widest transition-all cursor-hover"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* CONTACT FORM */
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="relative space-y-6"
                >
                  {/* Full Name */}
                  <div>
                    <label className="text-xs uppercase tracking-wider text-text-muted mb-2 font-mono block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="bg-surface/50 border border-white/10 rounded-lg text-white placeholder:text-text-muted/50 p-4 focus:border-ice-blue focus:ring-1 focus:ring-ice-blue/30 outline-none transition-all duration-300 w-full font-body"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="text-xs uppercase tracking-wider text-text-muted mb-2 font-mono block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="bg-surface/50 border border-white/10 rounded-lg text-white placeholder:text-text-muted/50 p-4 focus:border-ice-blue focus:ring-1 focus:ring-ice-blue/30 outline-none transition-all duration-300 w-full font-body"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="text-xs uppercase tracking-wider text-text-muted mb-2 font-mono block">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="bg-surface/80 border border-white/10 rounded-lg text-white p-4 focus:border-ice-blue focus:ring-1 focus:ring-ice-blue/30 outline-none transition-all duration-300 w-full font-body cursor-pointer"
                    >
                      <option value="Sports" className="bg-[#08080C] text-white">Sports</option>
                      <option value="Wedding" className="bg-[#08080C] text-white">Wedding</option>
                      <option value="Corporate" className="bg-[#08080C] text-white">Corporate</option>
                      <option value="Music" className="bg-[#08080C] text-white">Music</option>
                      <option value="Events" className="bg-[#08080C] text-white">Events</option>
                      <option value="Other" className="bg-[#08080C] text-white">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs uppercase tracking-wider text-text-muted mb-2 font-mono block">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className="bg-surface/50 border border-white/10 rounded-lg text-white placeholder:text-text-muted/50 p-4 focus:border-ice-blue focus:ring-1 focus:ring-ice-blue/30 outline-none transition-all duration-300 w-full font-body resize-none"
                    />
                  </div>

                  {/* Honeypot field — hidden from humans, catches bots */}
                  <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label>
                      Company
                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <p className="text-sm font-mono text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full mt-6 py-4 rounded-lg bg-ice-blue text-black font-mono font-semibold uppercase tracking-widest hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:scale-[1.02] transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 text-black animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
