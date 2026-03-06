"use client";

import { useState, useEffect } from "react";

interface PresaleModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PresaleModal({ email, isOpen, onClose }: PresaleModalProps) {
  const [loading, setLoading] = useState<"starter" | "pro" | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleCheckout(plan: "starter" | "pro") {
    setLoading(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(null);
      }
    } catch {
      setLoading(null);
    }
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1100,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{
        background: "#13131a",
        border: "1px solid #2a2a3e",
        borderRadius: 24,
        padding: "40px 32px",
        maxWidth: 600,
        width: "100%",
        boxShadow: "0 32px 100px rgba(0,0,0,0.7)",
        position: "relative",
        maxHeight: "95vh",
        overflowY: "auto",
      }}>
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#555570", fontSize: 20, cursor: "pointer", fontFamily: "inherit", padding: "4px 8px", lineHeight: 1 }}
          aria-label="Inchide"
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#a78bfa", marginBottom: 10 }}>
            Oferta Presale
          </div>
          <h3 style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 10, lineHeight: 1.2 }}>
            Locul tau e rezervat.<br />Blocheaza pretul acum, platesti la lansare.
          </h3>
          <p style={{ fontSize: 14, color: "#8888a8", lineHeight: 1.6 }}>
            Nu esti taxat azi. Prima plata se face automat la lansare (max 15 mai 2026).
            Poti anula oricand inainte, fara nicio taxa.
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>

          {/* Starter */}
          <div style={{ background: "#0d0d12", border: "1px solid #2a2a3e", borderRadius: 16, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#8888a8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Starter</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>197</span>
                <span style={{ fontSize: 14, color: "#8888a8" }}>lei/luna</span>
              </div>
              <div style={{ fontSize: 12, color: "#6c63ff", fontWeight: 600, marginTop: 4 }}>13 luni incluse/an</div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "Acces la toate cursurile disponibile",
                "Quiz după fiecare lecție",
                "Actualizări la cursurile existente",
                "Suport email",
                "Certificat digital (după min. 6 luni)",
              ].map(f => (
                <li key={f} style={{ fontSize: 13, color: "#b0b0c8", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout("starter")}
              disabled={loading !== null}
              style={{
                marginTop: "auto",
                padding: "12px 16px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                color: "#fff", fontWeight: 700, fontSize: 14,
                border: "none", cursor: loading !== null ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                opacity: loading !== null && loading !== "starter" ? 0.5 : 1,
                boxShadow: "0 6px 20px rgba(108,99,255,0.35)",
              }}
            >
              {loading === "starter" ? "Se redirectioneaza..." : "Rezerva Starter →"}
            </button>
          </div>

          {/* Pro */}
          <div style={{ background: "#0d0d12", border: "1.5px solid #6c63ff", borderRadius: 16, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
            <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #6c63ff, #a78bfa)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 100, letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Recomandat
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#8888a8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Pro</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>297</span>
                <span style={{ fontSize: 14, color: "#8888a8" }}>lei/luna</span>
              </div>
              <div style={{ fontSize: 12, color: "#6c63ff", fontWeight: 600, marginTop: 4 }}>13 luni incluse/an</div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "Tot ce include Starter",
                "Cursuri noi cu 15 zile înainte față de Starter",
                "Toate cursurile noi lansate cât timp ești abonat",
                "Resurse descărcabile (templates, prompturi, checklist-uri)",
                "Suport prioritar (răspuns mai rapid)",
              ].map(f => (
                <li key={f} style={{ fontSize: 13, color: "#b0b0c8", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout("pro")}
              disabled={loading !== null}
              style={{
                marginTop: "auto",
                padding: "12px 16px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                color: "#fff", fontWeight: 700, fontSize: 14,
                border: "none", cursor: loading !== null ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                opacity: loading !== null && loading !== "pro" ? 0.5 : 1,
                boxShadow: "0 6px 20px rgba(108,99,255,0.35)",
              }}
            >
              {loading === "pro" ? "Se redirectioneaza..." : "Rezerva Pro →"}
            </button>
          </div>
        </div>

        {/* Guarantees */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", padding: "16px 0", borderTop: "1px solid #1f1f2e" }}>
          {[
            "Fara card taxat azi",
            "Anulare libera inainte de lansare",
            "Garantie rambursare daca nu lansam",
          ].map(g => (
            <span key={g} style={{ fontSize: 12, color: "#8888a8", display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ color: "#22c55e" }}>✓</span> {g}
            </span>
          ))}
        </div>

        {/* Skip */}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#555570", fontSize: 13, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Raman doar pe waitlist, multumesc
          </button>
        </div>
      </div>
    </div>
  );
}
