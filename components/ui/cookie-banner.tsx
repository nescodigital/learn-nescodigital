"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_KEY = "edu-ai-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage not available
    }
  }, []);

  function accept() {
    try { localStorage.setItem(COOKIE_KEY, "accepted"); } catch {}
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem(COOKIE_KEY, "declined"); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }} />

      {/* Modal */}
      <div style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "calc(100% - 32px)",
        maxWidth: 480,
        background: "#13131a",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "24px 24px 20px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
      }}>
        <p style={{
          fontSize: 14,
          color: "#b0b0c8",
          lineHeight: 1.65,
          margin: "0 0 20px",
        }}>
          Folosim cookies pentru analytics si imbunatatirea experientei tale.{" "}
          <Link href="/politica-confidentialitate" style={{ color: "#a78bfa", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Afla mai multe
          </Link>
        </p>
        <button
          onClick={accept}
          style={{
            width: "100%",
            padding: "12px 20px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
            border: "none",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 4px 16px rgba(108,99,255,0.3)",
          }}
        >
          Accept cookies
        </button>
        <button
          onClick={decline}
          style={{
            display: "block",
            margin: "10px auto 0",
            background: "none",
            border: "none",
            color: "#444460",
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "inherit",
            textDecoration: "underline",
            textUnderlineOffset: 2,
          }}
        >
          Refuz
        </button>
      </div>
    </>
  );
}
