import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d12",
      color: "#ffffff",
      fontFamily: "Inter, -apple-system, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "40px 24px",
    }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>404</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, letterSpacing: -0.5 }}>
        Pagina nu există
      </h1>
      <p style={{ fontSize: 16, color: "#8888a8", marginBottom: 32 }}>
        Ne pare rău, pagina pe care o cauți nu a fost găsită.
      </p>
      <Link
        href="/"
        style={{
          padding: "12px 28px",
          borderRadius: 10,
          background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          textDecoration: "none",
        }}
      >
        Înapoi acasă →
      </Link>
    </div>
  );
}
