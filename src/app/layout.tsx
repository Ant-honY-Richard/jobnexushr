import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SiteLoader } from "@/components/SiteLoader";
import { MotionProvider } from "@/components/MotionProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GA_ID, GSC_VERIFICATION, SITE_URL } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf9f7",
};

export const metadata: Metadata = {
  title: {
    default: "Job Nexus HR | Recruitment & Staffing Agency in Bangalore",
    template: "%s",
  },
  description:
    "Job Nexus HR is a Bangalore recruitment and staffing agency for permanent hiring, volume staffing, payroll, PF/ESI compliance and background verification across India — with one account manager who stays with you after day one.",
  applicationName: "Job Nexus HR",
  keywords: [
    "recruitment agency Bangalore",
    "staffing agency Bangalore",
    "manpower agency Bangalore",
    "volume staffing",
    "contract staffing India",
    "payroll outsourcing",
    "PF ESI compliance",
    "background verification",
    "workforce management",
    "Job Nexus HR",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
  openGraph: {
    title: "Job Nexus HR | Recruitment & Staffing Agency in Bangalore",
    description:
      "Better Talent. Brighter Futures. Recruitment, staffing, payroll and compliance with one account manager who stays with you.",
    url: SITE_URL,
    type: "website",
    locale: "en_IN",
    siteName: "Job Nexus HR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Job Nexus HR — Better Talent. Brighter Futures." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Nexus HR | Recruitment & Staffing Agency in Bangalore",
    description: "Recruitment, staffing, payroll and compliance with one account manager who stays with you.",
    images: ["/og.png"],
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
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
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
          <WhatsAppButton />
        </MotionProvider>
        <Analytics gaId={GA_ID} />
      </body>
    </html>
  );
}
