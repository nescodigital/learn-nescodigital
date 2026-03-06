"use client";

import { useState, useEffect } from "react";

interface SegmentationModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

const ROL_OPTIONS = [
  { value: "Angajat", label: "👤 Angajat" },
  { value: "Antreprenor", label: "🚀 Antreprenor" },
  { value: "Manager", label: "📊 Manager" },
  { value: "Freelancer", label: "💼 Freelancer" },
  { value: "Student", label: "🎓 Student" },
];

const INDUSTRIE_OPTIONS = [
  { value: "Tech / IT", label: "💻 Tech / IT" },
  { value: "Marketing", label: "📣 Marketing" },
  { value: "Retail / E-commerce", label: "🛒 Retail / E-commerce" },
  { value: "Sănătate", label: "🏥 Sănătate" },
  { value: "Finanțe", label: "🏦 Finanțe" },
  { value: "Alta", label: "⚙️ Alta" },
];

const NIVEL_AI_OPTIONS = [
  { value: "Niciun tool AI folosit", label: "🔰 Nu am folosit încă" },
  { value: "Baza", label: "📖 Știu bazele (ChatGPT etc.)" },
  { value: "Intermediar", label: "⚡ Folosesc deja unele tool-uri" },
  { value: "Avansat", label: "🔥 Automatizez cu AI deja" },
];

const OBIECTIV_OPTIONS = [
  { value: "Economisesc timp", label: "⏱️ Să economisesc timp" },
  { value: "Cresc vânzările", label: "📈 Să cresc vânzările" },
  { value: "Automatizez procese", label: "🤖 Să automatizez procese" },
  { value: "Recalificare", label: "🔄 Să mă recalific / schimb cariera" },
];

function OptionGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(selected ? "" : opt.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: selected ? "1.5px solid #6c63ff" : "1px solid #2a2a3e",
              background: selected ? "rgba(108,99,255,0.15)" : "transparent",
              color: selected ? "#a78bfa" : "#b0b0c8",
              fontSize: 13,
              fontWeight: selected ? 600 : 400,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s ease",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function SegmentationModal({ email, isOpen, onClose }: SegmentationModalProps) {
  const [rol, setRol] = useState("");
  const [industrie, setIndustrie] = useState("");
  const [nivel_ai, setNivelAi] = useState("");
  const [obiectiv, setObiectiv] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Reset state when modal opens for a new email
  useEffect(() => {
    if (isOpen) {
      setRol("");
      setIndustrie("");
      setNivelAi("");
      setObiectiv("");
      setStatus("idle");
    }
  }, [isOpen, email]);

  // Auto-close after success
  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(onClose, 2200);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/waitlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, rol, industrie, nivel_ai, obiectiv }),
      });
      setStatus("success");
    } catch {
      setStatus("success"); // don't block the user on error
    }
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#13131a",
          border: "1px solid #2a2a3e",
          borderRadius: 20,
          padding: "36px 32px",
          maxWidth: 540,
          width: "100%",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            color: "#555570",
            fontSize: 20,
            cursor: "pointer",
            lineHeight: 1,
            fontFamily: "inherit",
            padding: "4px 8px",
          }}
          aria-label="Închide"
        >
          ✕
        </button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎯</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
              Mulțumim!
            </div>
            <div style={{ fontSize: 15, color: "#8888a8", lineHeight: 1.6 }}>
              Vom personaliza recomandările pentru tine și te vom contacta cu oferte relevante.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <div style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#a78bfa",
                marginBottom: 10,
              }}>
                Pasul 2 din 2
              </div>
              <h3 style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.5px",
                marginBottom: 8,
                lineHeight: 1.3,
              }}>
                Ajută-ne să personalizăm experiența ta
              </h3>
              <p style={{ fontSize: 14, color: "#8888a8", lineHeight: 1.6 }}>
                2 minute. Îți trimitem exact cursurile potrivite pentru situația ta.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Rol */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#b0b0c8", marginBottom: 10 }}>
                  Care este rolul tău?
                </label>
                <OptionGroup options={ROL_OPTIONS} value={rol} onChange={setRol} />
              </div>

              {/* Industrie */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#b0b0c8", marginBottom: 10 }}>
                  În ce industrie activezi?
                </label>
                <OptionGroup options={INDUSTRIE_OPTIONS} value={industrie} onChange={setIndustrie} />
              </div>

              {/* Nivel AI */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#b0b0c8", marginBottom: 10 }}>
                  Cum folosești AI-ul acum?
                </label>
                <OptionGroup options={NIVEL_AI_OPTIONS} value={nivel_ai} onChange={setNivelAi} />
              </div>

              {/* Obiectiv */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#b0b0c8", marginBottom: 10 }}>
                  Care este obiectivul tău principal?
                </label>
                <OptionGroup options={OBIECTIV_OPTIONS} value={obiectiv} onChange={setObiectiv} />
              </div>

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    padding: "13px 20px",
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: "0 8px 24px rgba(108,99,255,0.3)",
                    transition: "opacity 0.15s",
                    opacity: status === "loading" ? 0.7 : 1,
                  }}
                >
                  {status === "loading" ? "Se salvează..." : "Salvează preferințele →"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#555570",
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    padding: "6px",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Poate mai târziu
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
