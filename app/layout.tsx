import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { BokehBackground } from "@/components/BokehBackground";
import { ViewfinderCursor } from "@/components/ViewfinderCursor";
import { Navbar } from "@/components/Navbar";
import { FilmFrame } from "@/components/FilmFrame";
import { HeroLoader } from "@/components/HeroLoader";
import { Vignette } from "@/components/Vignette";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://framesbyadrian.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FramesByAdrian | Professional Photography",
    template: "%s | FramesByAdrian",
  },
  description:
    "Sports, Wedding, Corporate, Music & Events Photography by Adrian. Trusted by global brands and sports franchises.",
  keywords: [
    "photography",
    "sports photography",
    "wedding photography",
    "event photography",
    "Bengaluru photographer",
    "Adrian",
  ],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "FramesByAdrian | Professional Photography",
    description:
      "Sports, Wedding, Corporate, Music & Events Photography by Adrian.",
    type: "website",
    images: ["/Frames by Adrian White.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08080C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-background text-text-primary font-body antialiased selection:bg-ice-blue/30 selection:text-ice-blue">
        <HeroLoader />
        <Vignette />
        <FilmFrame />
        <BokehBackground />
        <ViewfinderCursor />
        <Navbar />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
