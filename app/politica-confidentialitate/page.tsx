import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politica de Confidentialitate | Edu-AI",
  description: "Politica de confidentialitate Edu-AI. Afla cum colectam, folosim si protejam datele tale personale.",
};

export default function PoliticaConfidentialitate() {
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
          Politica de Confidentialitate
        </h1>
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 48 }}>Ultima actualizare: februarie 2025</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          <section>
            <h2 style={h2}>1. Cine suntem</h2>
            <p style={p}>
              Edu-AI ("noi", "noua") este o platforma de cursuri AI practice pentru business-ul tau, cu sediul in Romania.
              Pentru intrebari legate de confidentialitate, ne poti contacta la{" "}
              <a href="mailto:hello@edu-ai.ro" style={link}>hello@edu-ai.ro</a>.
            </p>
          </section>

          <section>
            <h2 style={h2}>2. Ce date colectam</h2>
            <p style={p}><strong style={{ color: "var(--text)" }}>Prin formularul de inscriere pe lista de asteptare:</strong></p>
            <p style={p}>Nume (optional), adresa de email si preferinte de curs selectate. Aceste date sunt folosite exclusiv pentru a te notifica la lansare si pentru a personaliza ofertele.</p>
            <p style={{ ...p, marginTop: 16 }}><strong style={{ color: "var(--text)" }}>Prin intrebari de segmentare (optional):</strong></p>
            <p style={p}>Rol profesional, industrie, nivel de utilizare AI si obiectiv principal. Aceste date ne ajuta sa iti trimitem recomandari relevante.</p>
            <p style={{ ...p, marginTop: 16 }}><strong style={{ color: "var(--text)" }}>Prin cookies si analytics:</strong></p>
            <p style={p}>Folosim Google Analytics pentru masurarea performantei si intelegerea comportamentului vizitatorilor. Colectarea are loc doar dupa acordul tau explicit prin bannerul de cookies.</p>
          </section>

          <section>
            <h2 style={h2}>3. De ce colectam aceste date</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border2)" }}>
                    <th style={th}>Date</th>
                    <th style={th}>Temei legal</th>
                    <th style={th}>Scop</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Formular inscriere", "Consimtamant", "Notificare la lansare, pret special waitlist"],
                    ["Date segmentare", "Consimtamant", "Personalizare recomandari si oferte"],
                    ["Analytics", "Consimtamant", "Masurare performanta, imbunatatirea platformei"],
                  ].map(([date, temei, scop]) => (
                    <tr key={date} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={td}>{date}</td>
                      <td style={td}>{temei}</td>
                      <td style={td}>{scop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 style={h2}>4. Cat timp pastram datele</h2>
            <p style={p}>Datele de inscriere pe waitlist sunt pastrate pana la lansarea platformei sau pana la cererea de stergere. Datele de newsletter sunt pastrate pana la dezabonare. Datele analytics sunt anonimizate si agregate.</p>
          </section>

          <section>
            <h2 style={h2}>5. Cu cine partajam datele</h2>
            <p style={p}>Nu vindem si nu inchiriem datele tale. Datele sunt procesate de urmatorii furnizori de servicii:</p>
            <ul style={ul}>
              <li style={li}>Supabase - stocare securizata a datelor de inscriere</li>
              <li style={li}>Google Analytics - analytics site</li>
            </ul>
            <p style={p}>Toti furnizorii sunt conformi GDPR si proceseaza datele in baza unor acorduri de procesare a datelor (DPA).</p>
          </section>

          <section>
            <h2 style={h2}>6. Drepturile tale</h2>
            <p style={p}>Conform GDPR, ai dreptul sa:</p>
            <ul style={ul}>
              <li style={li}>Accesezi datele pe care le detinem despre tine</li>
              <li style={li}>Rectifici datele incorecte</li>
              <li style={li}>Stergi datele ("dreptul de a fi uitat")</li>
              <li style={li}>Retragi consimtamantul oricand, fara consecinte</li>
              <li style={li}>Portabilitatii datelor</li>
              <li style={li}>Depui o plangere la autoritatea de supraveghere competenta (ANSPDCP)</li>
            </ul>
            <p style={p}>
              Pentru orice solicitare:{" "}
              <a href="mailto:hello@edu-ai.ro" style={link}>hello@edu-ai.ro</a>.
              Raspundem in maximum 30 de zile.
            </p>
          </section>

          <section>
            <h2 style={h2}>7. Cookies</h2>
            <ul style={ul}>
              <li style={li}><strong style={{ color: "var(--text)" }}>Esentiale</strong> - necesare functionarii site-ului, nu necesita consimtamant.</li>
              <li style={li}><strong style={{ color: "var(--text)" }}>Analytics</strong> - Google Analytics, activate doar dupa acordul tau. Poti modifica preferintele oricand din bannerul de cookies.</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>8. Securitate</h2>
            <p style={p}>Datele sunt transmise prin conexiuni criptate (HTTPS). Accesul la datele de contact este restrictionat si monitorizat.</p>
          </section>

          <section>
            <h2 style={h2}>9. Modificari</h2>
            <p style={p}>Ne rezervam dreptul de a actualiza aceasta politica. Modificarile semnificative vor fi comunicate prin email abonatilor.</p>
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

const th: React.CSSProperties = {
  padding: "10px 14px",
  textAlign: "left",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--muted)",
  background: "var(--bg2)",
};

const td: React.CSSProperties = {
  padding: "10px 14px",
  fontSize: 14,
  color: "var(--muted2)",
  verticalAlign: "top",
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
