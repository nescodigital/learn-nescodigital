import type { Metadata } from "next";
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" style={{ background: "#0d0d12" }}>
      <body style={{ background: "#0d0d12", color: "#ffffff" }}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
