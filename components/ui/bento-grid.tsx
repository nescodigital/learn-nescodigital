"use client";

import { cn } from "@/lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
      }}
      className="bento-grid"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="group"
          style={{
            position: "relative",
            padding: "20px",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(108,99,255,0.3)",
            background: "#111020",
            boxShadow: "0 0 32px rgba(108,99,255,0.12)",
            transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
            cursor: "default",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "rgba(108,99,255,0.5)";
            el.style.boxShadow = "0 0 40px rgba(108,99,255,0.2)";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "rgba(108,99,255,0.3)";
            el.style.boxShadow = "0 0 32px rgba(108,99,255,0.12)";
            el.style.transform = "translateY(0)";
          }}
        >
          {/* Dot pattern on all cards */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at center, rgba(108,99,255,0.07) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              pointerEvents: "none",
            }}
          />

          {/* Icon row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(108,99,255,0.12)",
                border: "1px solid rgba(108,99,255,0.18)",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            {item.status && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 100,
                  background: "rgba(108,99,255,0.12)",
                  color: "#a78bfa",
                  border: "1px solid rgba(108,99,255,0.18)",
                  letterSpacing: "0.3px",
                }}
              >
                {item.status}
              </span>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: "-0.2px" }}>
                {item.title}
              </span>
              {item.meta && (
                <span style={{ marginLeft: 8, fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>
                  {item.meta}
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0 }}>
              {item.description}
            </p>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.tags?.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 5,
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.35)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span
              className="bento-cta"
              style={{
                fontSize: 12,
                color: "#a78bfa",
                opacity: 0,
                transition: "opacity 0.2s",
                whiteSpace: "nowrap",
                marginLeft: 8,
              }}
            >
              {item.cta || "Explorează →"}
            </span>
          </div>
        </div>
      ))}

      <style>{`
        .bento-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .bento-grid { grid-template-columns: 1fr !important; }
        }
        .group:hover .bento-cta { opacity: 1 !important; }
      `}</style>
    </div>
  );
}

export { BentoGrid };
