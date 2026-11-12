import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SiteLoader } from "@/components/SiteLoader";
import { MotionProvider } from "@/components/MotionProvider";
import { SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf9f7",
};

export const metadata: Metadata = {
  title: {
    default: "Job Nexus HR — Recruitment & Staffing. Better Talent. Brighter Futures.",
    template: "%s",
  },
  description:
    "Recruitment, staffing, payroll and workforce support from Job Nexus HR — verified people and one account manager who stays with you long after day one.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Job Nexus HR — Recruitment & Staffing",
    description:
      "Better Talent. Brighter Futures. Recruitment and staffing with one account manager who stays with you.",
    type: "website",
    siteName: "Job Nexus HR",
    images: [{ url: "/logo.png", width: 996, height: 1000, alt: "Job Nexus HR" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Site-wide font in the root layout, so the per-page-font rule does not apply */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Caveat:wght@500;600&display=swap"
        />
      </head>
      <body className="bg-off-white text-ink antialiased selection:bg-green selection:text-off-white">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <SiteLoader />
          <CustomCursor />
          <Navbar />
          <main id="main" tabIndex={-1} className="relative outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
