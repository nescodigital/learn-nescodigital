import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CookieBanner } from "@/components/ui/cookie-banner";

export const metadata: Metadata = {
  title: "Edu-AI: Cursuri AI practice pentru business-ul tău",
  description: "Cursuri video 100% în română despre AI, automatizări și marketing digital. Aplici din prima săptămână. Certificat la final.",
  openGraph: {
    title: "Edu-AI: Cursuri AI practice pentru business",
    description: "Cursuri video 100% în română despre AI, automatizări și marketing digital.",
    url: "https://edu-ai.ro",
    siteName: "Edu-AI",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "https://edu-ai.ro/og-image.png",
        width: 1200,
        height: 630,
        alt: "Edu-AI: Cursuri AI practice pentru business",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" style={{ background: "#0d0d12" }}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4MPTZF110R"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4MPTZF110R');
          `}
        </Script>
      </head>
      <body style={{ background: "#0d0d12", color: "#ffffff" }}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
