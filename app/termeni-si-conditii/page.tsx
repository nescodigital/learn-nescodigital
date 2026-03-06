import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termeni si Conditii | Edu-AI",
  description: "Termenii si conditiile de utilizare ale platformei Edu-AI.",
};

export default function TermeniSiConditii() {
  return (
    <div style={{ minHeight: "100vh", background: "#0d0d12", color: "#ffffff", fontFamily: "Inter, -apple-system, sans-serif" }}>
      <nav style={{ padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", background: "rgba(13,13,18,0.9)", backdropFilter: "blur(20px)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Edu-AI" style={{ height: 30, width: "auto" }} />
        </Link>
        <Link href="/" style={{ fontSize: 14, color: "var(--muted2)", textDecoration: "none" }}>← Înapoi</Link>
      </nav>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px 100px" }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 8, lineHeight: 1.1 }}>
          Termeni si Conditii
        </h1>
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 48 }}>Ultima actualizare: februarie 2025</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          <section>
            <h2 style={h2}>1. Acceptarea termenilor</h2>
            <p style={p}>Prin accesarea si utilizarea edu-ai.ro, accepti automat acesti Termeni si Conditii. Daca nu esti de acord, te rugam sa nu utilizezi site-ul.</p>
          </section>

          <section>
            <h2 style={h2}>2. Despre Edu-AI</h2>
            <p style={p}>
              Edu-AI este o platforma de cursuri video despre inteligenta artificiala si automatizari, destinata profesionistilor si antreprenorilor din Romania.
              Contact:{" "}
              <a href="mailto:hello@edu-ai.ro" style={link}>hello@edu-ai.ro</a>
            </p>
          </section>

          <section>
            <h2 style={h2}>3. Utilizarea site-ului</h2>
            <p style={p}>Website-ul prezinta servicii si cursuri in scop informativ. Edu-AI isi rezerva dreptul de a modifica, suspenda sau inchide site-ul oricand, fara notificare prealabila.</p>
            <p style={{ ...p, marginTop: 12 }}>Utilizarile interzise includ:</p>
            <ul style={ul}>
              <li style={li}>Activitati ilegale sau contrare bunelor moravuri</li>
              <li style={li}>Transmiterea de continut daunator, spam sau malware</li>
              <li style={li}>Tentative de acces neautorizat la sisteme</li>
              <li style={li}>Copierea sau redistribuirea continutului fara permisiune scrisa</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>4. Proprietate intelectuala</h2>
            <p style={p}>Tot continutul platformei - cursuri video, materiale scrise, grafica, logo-uri, structura vizuala - apartine Edu-AI sau partenerilor sai si este protejat de drepturi de autor. Reproducerea fara permisiune scrisa este interzisa.</p>
          </section>

          <section>
            <h2 style={h2}>5. Cursuri si abonamente</h2>
            <p style={p}>Cursurile descrise pe platforma au caracter informativ si de previzualizare. Termenii specifici privind accesul, plata si conditiile de utilizare vor fi prezentati clar inainte de finalizarea oricarei tranzactii.</p>
            <p style={{ ...p, marginTop: 12 }}>Inscrierea pe lista de asteptare (waitlist) nu reprezinta o obligatie de cumparare si nu implica nicio plata. Iti rezerva accesul la pret special de lansare.</p>
          </section>

          <section>
            <h2 style={h2}>6. Lista de asteptare (Waitlist)</h2>
            <p style={p}>Prin inscrierea pe lista de asteptare esti de acord sa primesti comunicari despre lansarea platformei, noutati si oferte speciale. Te poti dezabona oricand prin linkul din email sau contactand{" "}
              <a href="mailto:hello@edu-ai.ro" style={link}>hello@edu-ai.ro</a>.
            </p>
          </section>

          <section>
            <h2 style={h2}>7. Limitarea raspunderii</h2>
            <p style={p}>Edu-AI nu este raspunzatoare pentru daune directe sau indirecte rezultate din utilizarea sau indisponibilitatea site-ului. Nu se garanteaza functionarea continua si fara erori a platformei.</p>
          </section>

          <section>
            <h2 style={h2}>8. Linkuri externe</h2>
            <p style={p}>Site-ul poate contine linkuri catre terti. Edu-AI nu controleaza continutul extern si nu isi asuma nicio responsabilitate pentru acesta.</p>
          </section>

          <section>
            <h2 style={h2}>9. Modificari</h2>
            <p style={p}>Termenii pot fi actualizati oricand. Continuarea utilizarii site-ului dupa modificari constituie acceptarea noilor termeni.</p>
          </section>

          <section>
            <h2 style={h2}>10. Legea aplicabila</h2>
            <p style={p}>Acesti termeni sunt guvernati de legislatia romana. Disputele vor fi solutionate de instantele romane competente.</p>
          </section>

        </div>
      </div>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "24px", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>© 2026 Edu-AI. Toate drepturile rezervate.</span>
      </footer>
    </div>
  );
}

const h2: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 12,
  color: "var(--text)",
  letterSpacing: "-0.3px",
};

const p: React.CSSProperties = {
  fontSize: 15,
  color: "var(--muted2)",
  lineHeight: 1.8,
  margin: 0,
};

const link: React.CSSProperties = {
  color: "#a78bfa",
  textDecoration: "underline",
  textUnderlineOffset: 3,
};

const ul: React.CSSProperties = {
  paddingLeft: 20,
  margin: "8px 0 0",
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const li: React.CSSProperties = {
  fontSize: 15,
  color: "var(--muted2)",
  lineHeight: 1.7,
};
