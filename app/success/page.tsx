"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SegmentationModal } from "@/components/ui/segmentation-modal";

function SuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? "";
  const sessionId = searchParams?.get("session_id") ?? "";
  const [modalOpen, setModalOpen] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    if (!sessionId) { setVerified(false); return; }
    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then(r => r.json())
      .then(data => setVerified(data.valid === true))
      .catch(() => setVerified(false));
  }, [sessionId]);

  useEffect(() => {
    if (verified !== true) return;
    const t = setTimeout(() => setModalOpen(true), 1200);
    return () => clearTimeout(t);
  }, [verified]);

  if (verified === false) {
    return (
      <div style={{ minHeight: "100vh", background: "#0d0d12", color: "#fff", fontFamily: "Inter, -apple-system, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Sesiune invalidă</h1>
          <p style={{ color: "#b0b0c8", marginBottom: 24 }}>Nu am putut confirma plata ta. Dacă ai fost taxat, contactează-ne la <a href="mailto:hello@edu-ai.ro" style={{ color: "#a78bfa" }}>hello@edu-ai.ro</a>.</p>
          <Link href="/" style={{ padding: "12px 24px", borderRadius: 10, background: "linear-gradient(135deg, #6c63ff, #a78bfa)", color: "#fff", fontWeight: 700, textDecoration: "none" }}>Înapoi acasă</Link>
        </div>
      </div>
    );
  }

  if (verified === null) {
    return <div style={{ minHeight: "100vh", background: "#0d0d12" }} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d12", color: "#ffffff", fontFamily: "Inter, -apple-system, sans-serif", display: "flex", flexDirection: "column" }}>
      <nav style={{ padding: "18px 40px", display: "flex", justifyContent: "center", borderBottom: "1px solid #1f1f2e", background: "rgba(13,13,18,0.9)", backdropFilter: "blur(20px)" }}>
        <img src="/logo.png" alt="Edu-AI" style={{ height: 30, width: "auto" }} />
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>

          <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>

          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#a78bfa", marginBottom: 16, background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.3)", borderRadius: 100, padding: "6px 16px" }}>
            Presale confirmat
          </div>

          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16, lineHeight: 1.15 }}>
            Ești la bord.
          </h1>

          <p style={{ fontSize: 16, color: "#b0b0c8", lineHeight: 1.7, marginBottom: 32 }}>
            Cardul tău a fost salvat în siguranță. Nu ești taxat acum.
            Prima plată se face automat la lansare (maximum 15 mai 2026).
            Poți anula oricând înainte, fără nicio taxă.
          </p>

          <div style={{ background: "#13131a", border: "1px solid #2a2a3e", borderRadius: 16, padding: "28px 24px", marginBottom: 32, textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#8888a8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16 }}>Ce urmează</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "📧", text: "Primești un email de confirmare de la Stripe în câteva minute" },
                { icon: "🔒", text: "Prețul tău este blocat — nu va crește niciodată pentru tine" },
                { icon: "🚀", text: "La lansare primești primul email cu acces la platformă" },
                { icon: "💬", text: "Ești adăugat în comunitatea privată pre-lansare" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 14, color: "#b0b0c8", lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/" style={{ display: "inline-block", padding: "13px 28px", borderRadius: 10, background: "linear-gradient(135deg, #6c63ff, #a78bfa)", color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 8px 24px rgba(108,99,255,0.35)" }}>
            Înapoi la pagina principală
          </Link>

          <p style={{ fontSize: 12, color: "#555570", marginTop: 20, lineHeight: 1.6 }}>
            Întrebări? Scrie-ne la{" "}
            <a href="mailto:hello@edu-ai.ro" style={{ color: "#a78bfa", textDecoration: "underline" }}>hello@edu-ai.ro</a>
          </p>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid #1f1f2e", padding: "24px", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "#8888a8" }}>© 2026 Edu-AI. Toate drepturile rezervate.</span>
      </footer>

      <SegmentationModal
        email={email}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0d0d12" }} />}>
      <SuccessContent />
    </Suspense>
  );
}
