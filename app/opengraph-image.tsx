import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Edu-AI: Cursuri AI practice pentru business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0d0d12",
          padding: "80px 90px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -100,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Hero hexagon element — right side */}
        <img
          src="https://edu-ai.ro/hero-element.png"
          width={480}
          height={480}
          style={{
            position: "absolute",
            right: -60,
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.85,
          }}
        />

        {/* Logo */}
        <img
          src="https://edu-ai.ro/logo.png"
          height={34}
          style={{ marginBottom: 40 }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(108,99,255,0.15)",
            border: "1px solid rgba(108,99,255,0.35)",
            borderRadius: 100,
            padding: "6px 18px",
            marginBottom: 28,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", letterSpacing: 1.5 }}>
            CURSURI AI ÎN ROMÂNĂ
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: -2,
            color: "#ffffff",
            maxWidth: 580,
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ color: "#a78bfa" }}>AI-ul nu îți ia jobul.</span>
          <span>Îl ia cel care știe să-l folosească.</span>
        </div>

        {/* Subtext */}
        <div style={{ fontSize: 19, color: "#8888a8", maxWidth: 500, lineHeight: 1.5 }}>
          Cursuri video 100% în română. Automatizări, marketing și AI pentru business.
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 90,
            fontSize: 15,
            color: "#444460",
            fontWeight: 500,
          }}
        >
          edu-ai.ro
        </div>
      </div>
    ),
    { ...size }
  );
}
