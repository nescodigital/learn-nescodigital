"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

// ─── CONȚINUT PER COHORTĂ ───────────────────────────────────────────────────

const COHORT_DATA = {
  angajat: {
    badge: "Pentru angajați și profesioniști",
    headline: "Colegul tău mai tânăr știe deja să folosească AI. Tu?",
    subheadline: "Nu e vina ta că nu ai învățat până acum. Dar de mâine nu mai ai scuze.",
    painPoints: [
      { icon: "⏳", text: "Simți că faci în 8 ore ce alții fac în 2 cu ajutorul AI-ului?" },
      { icon: "😟", text: "Ți-e teamă că la următoarea rundă de concedieri vei fi printre primii?" },
      { icon: "📉", text: "CV-ul tău arată la fel ca acum 5 ani, fără nicio competență nouă?" },
    ],
    ctaHeadline: "Înscrie-te acum și fii pregătit când contează",
    ctaSubtext: "Preț special pentru cei de pe waitlist. Locuri limitate.",
    planName: "STARTER",
    planPrice: "197",
    planPriceOriginal: "329",
    planPriceYearly: "157",
    planPriceYearlyOriginal: "262",
    planFeatures: [
      "Acces la toate cursurile",
      "Quiz după fiecare lecție",
      "Actualizări de conținut incluse",
      "Suport email",
    ],
    planDesc: "Tot ce ai nevoie ca să nu rămâi în urmă.",
    planBtn: "Rezervă-mi locul →",
    testimonial: {
      text: "Am terminat primul modul în 3 zile. Șeful meu m-a întrebat cum am automatizat raportul săptămânal. I-am spus că am învățat online.",
      name: "Mihai D.",
      role: "Contabil, 38 ani",
    },
    trustBadges: ["✓ 100% în română", "✓ Aplici din prima săptămână", "✓ Preț special waitlist"],
  },
  antreprenor: {
    badge: "Pentru antreprenori și freelanceri",
    headline: "Businessul tău pierde bani în fiecare zi fără AI.",
    subheadline: "Concurenții tăi automatizează deja. Tu încă faci manual ce ei fac în 10 minute.",
    painPoints: [
      { icon: "💸", text: "Plătești oameni să facă muncă repetitivă pe care AI-ul o face instant?" },
      { icon: "🕐", text: "Pierzi ore în șir pe taskuri administrative în loc să crești businessul?" },
      { icon: "📊", text: "Campaniile tale de marketing merg pe burtă pentru că nu știi să folosești AI?" },
    ],
    ctaHeadline: "Automatizează. Crește. Câștigă mai mult.",
    ctaSubtext: "Preț de lansare -40%. Disponibil doar pentru cei de pe waitlist.",
    planName: "PRO",
    planPrice: "297",
    planPriceOriginal: "495",
    planPriceYearly: "238",
    planPriceYearlyOriginal: "397",
    planFeatures: [
      "Tot ce include Starter",
      "Acces prioritar la cursuri noi",
      "Resurse descărcabile (templates, prompturi, checklist-uri)",
      "Suport prioritar — răspuns în față față de Starter",
      "Certificat digital recunoscut (după min. 6 luni)",
    ],
    planDesc: "Pentru antreprenorii care nu își permit să rămână în urmă.",
    planBtn: "Vreau să cresc cu AI →",
    testimonial: {
      text: "Am automatizat complet prospectarea. 40 de lead-uri calificate pe săptămână fără să ating tastatura. ROI în prima lună.",
      name: "Alexandru M.",
      role: "Fondator agenție, 34 ani",
    },
    trustBadges: ["✓ ROI din prima lună", "✓ Templates gata de folosit", "✓ Preț lansare -40%"],
  },
  manager: {
    badge: "Pentru manageri și directori HR",
    headline: "Echipa ta va fi depășită în 12 luni dacă nu acționezi acum.",
    subheadline: "Nu e suficient să știi tu AI. Dacă echipa ta nu știe, productivitatea nu crește.",
    painPoints: [
      { icon: "👥", text: "Angajații tăi rezistă la schimbare și evită să folosească AI în munca de zi cu zi?" },
      { icon: "📋", text: "Nu ai un program structurat de upskilling și fiecare face ce vrea?" },
      { icon: "🏆", text: "Competitorii recrutează oameni cu competențe AI și tu nu poți ține pasul?" },
    ],
    ctaHeadline: "Pregătește-ți echipa. Certificat inclus pentru toți.",
    ctaSubtext: "Minim 3 licențe. Onboarding dedicat. Raport progres per angajat.",
    planName: "BUSINESS",
    planPrice: null,
    planPriceOriginal: null,
    planPriceYearly: null,
    planPriceYearlyOriginal: null,
    planFeatures: [
      "Tot ce include Pro pentru fiecare licență",
      "Minim 3 licențe per echipă",
      "Certificat digital pentru toți membrii",
      "Raport progres per angajat",
      "Onboarding dedicat",
    ],
    planDesc: "Pregătește-ți întreaga echipă. Prețul include minim 3 licențe Pro.",
    planBtn: "Solicită ofertă →",
    testimonial: {
      text: "Am instruit 8 colegi în 6 săptămâni. Toți au certificat. Productivitatea echipei a crescut vizibil în prima lună.",
      name: "Ioana P.",
      role: "HR Manager, companie 50 angajați",
    },
    trustBadges: ["✓ Certificat pentru toți", "✓ Raport progres", "✓ Onboarding dedicat"],
  },
} as const;

type CohortKey = keyof typeof COHORT_DATA;

// ─── WAITLIST FORM ──────────────────────────────────────────────────────────

function WaitlistForm({ sursa, isBusiness }: { sursa: string; isBusiness: boolean }) {
  const [form, setForm] = useState({ nume: "", email: "", interes: "" });
  const [licenses, setLicenses] = useState(3);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sursa }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "A apărut o eroare. Încearcă din nou.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("A apărut o eroare. Încearcă din nou.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Ești pe listă!</div>
        <div style={{ fontSize: 15, color: "#8888a8", lineHeight: 1.6 }}>
          Te anunțăm la lansare cu preț special pentru cei de pe waitlist.
        </div>
      </div>
    );
  }

  if (isBusiness) {
    const pricePerLicense = 997;
    const total = licenses * pricePerLicense;
    const mailSubject = encodeURIComponent(`Oferta Business EduAI - ${licenses} licente`);
    const mailBody = encodeURIComponent(`Buna ziua, sunt interesat de pachetul Business pentru ${licenses} licente (${total} RON / 6 luni).`);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Selector licențe */}
        <div>
          <div style={{ fontSize: 13, color: "#8888a8", marginBottom: 10 }}>Număr de licențe (minim 3):</div>
          <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid #2a2a3e", borderRadius: 10, overflow: "hidden", width: "fit-content" }}>
            <button onClick={() => setLicenses(l => Math.max(3, l - 1))}
              style={{ width: 44, height: 44, background: "none", border: "none", color: licenses === 3 ? "#444" : "#a78bfa", fontSize: 20, cursor: licenses === 3 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>−</button>
            <span style={{ minWidth: 40, textAlign: "center", fontSize: 16, fontWeight: 700, color: "#fff" }}>{licenses}</span>
            <button onClick={() => setLicenses(l => Math.min(50, l + 1))}
              style={{ width: 44, height: 44, background: "none", border: "none", color: "#a78bfa", fontSize: 20, cursor: "pointer", fontFamily: "inherit" }}>+</button>
          </div>
        </div>
        <div>
          <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-2px", color: "#fff" }}>{total.toLocaleString("ro-RO")} RON</span>
          <span style={{ fontSize: 14, color: "#8888a8", marginLeft: 8 }}>/ 6 luni · {licenses} licențe</span>
          <div style={{ fontSize: 13, color: "#6c63ff", marginTop: 4 }}>{pricePerLicense} RON / licență</div>
        </div>
        <a href={`mailto:hello@nescodigital.ro?subject=${mailSubject}&body=${mailBody}`}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "14px 24px", borderRadius: 10, fontSize: 16, fontWeight: 700,
            background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
            color: "#fff", textDecoration: "none",
            boxShadow: "0 8px 24px rgba(108,99,255,0.3)",
          }}>
          Solicită ofertă →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input
          style={{ background: "#1a1a24", border: "1px solid #2a2a3e", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none" }}
          type="text" placeholder="Prenume (opțional)"
          value={form.nume} onChange={(e) => setForm(f => ({ ...f, nume: e.target.value }))}
        />
        <input
          style={{ background: "#1a1a24", border: "1px solid #2a2a3e", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 15, fontFamily: "inherit", outline: "none" }}
          type="email" placeholder="Email *" required
          value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
        />
        {status === "error" && (
          <div style={{ fontSize: 13, color: "#f87171", padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8 }}>
            {errorMsg}
          </div>
        )}
        <button type="submit" disabled={status === "loading"}
          style={{
            padding: "14px 24px", borderRadius: 10, fontSize: 16, fontWeight: 700, border: "none",
            background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
            color: "#fff", cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 8px 24px rgba(108,99,255,0.3)",
            opacity: status === "loading" ? 0.7 : 1,
          }}>
          {status === "loading" ? "Se înscrie..." : "Rezervă-mi locul acum →"}
        </button>
      </div>
    </form>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function LpPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const cohort = (params?.cohort as string)?.toLowerCase() as CohortKey;
  const data = COHORT_DATA[cohort] ?? COHORT_DATA.angajat;
  const isBusiness = cohort === "manager";

  // sursa = cohort + eventualul ?src= din URL (pentru variante de ad)
  const adSrc = searchParams?.get("src");
  const sursa = adSrc ?? `lp-${cohort}`;

  const [isYearly, setIsYearly] = useState(false);
  const price = isYearly ? data.planPriceYearly : data.planPrice;
  const originalPrice = isYearly ? data.planPriceYearlyOriginal : data.planPriceOriginal;

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d12", color: "#fff", fontFamily: "Inter, sans-serif" }}>

      {/* NAV minimal */}
      <nav style={{ padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #1f1f2e" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #6c63ff, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>E</div>
          <span style={{ fontWeight: 700, fontSize: 16 }}>EduAI</span>
        </div>
        <a href="/" style={{ fontSize: 13, color: "#8888a8", textDecoration: "none" }}>← Înapoi la site</a>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 32px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#a78bfa", background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.25)", borderRadius: 6, padding: "4px 14px", marginBottom: 24 }}>
          {data.badge}
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 20, background: "linear-gradient(135deg, #fff 50%, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {data.headline}
        </h1>
        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#8888a8", lineHeight: 1.65, marginBottom: 0 }}>
          {data.subheadline}
        </p>
      </div>

      {/* PAIN POINTS */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 72px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {data.painPoints.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, background: "#13131a", border: "1px solid #1f1f2e", borderRadius: 12, padding: "18px 20px" }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{p.icon}</span>
              <span style={{ fontSize: 16, color: "#b0b0c8", lineHeight: 1.55 }}>{p.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SEPARATOR */}
      <div style={{ maxWidth: 760, margin: "0 auto 72px", padding: "0 32px" }}>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #2a2a3e, transparent)" }} />
      </div>

      {/* TESTIMONIAL */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px 72px" }}>
        <div style={{ background: "#13131a", border: "1px solid #2a2a3e", borderRadius: 16, padding: "32px", position: "relative" }}>
          <div style={{ fontSize: 32, color: "#6c63ff", marginBottom: 12, lineHeight: 1 }}>"</div>
          <p style={{ fontSize: 17, color: "#b0b0c8", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
            {data.testimonial.text}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #6c63ff, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>
              {data.testimonial.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{data.testimonial.name}</div>
              <div style={{ fontSize: 13, color: "#8888a8" }}>{data.testimonial.role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* PLAN + FORM */}
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 32px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}>
            {data.ctaHeadline}
          </h2>
          <p style={{ fontSize: 15, color: "#8888a8" }}>{data.ctaSubtext}</p>
        </div>

        <div style={{ background: "#13131a", border: "2px solid #6c63ff", borderRadius: 20, padding: "36px", boxShadow: "0 0 60px rgba(108,99,255,0.15)" }}>

          {/* Toggle lunar/anual — doar pentru non-business */}
          {!isBusiness && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: !isYearly ? "#fff" : "#8888a8" }}>Lunar</span>
              <button onClick={() => setIsYearly(v => !v)}
                style={{ position: "relative", width: 44, height: 24, borderRadius: 100, border: "none", cursor: "pointer", background: isYearly ? "#6c63ff" : "#2a2a3e", transition: "background 0.25s", flexShrink: 0 }}>
                <span style={{ position: "absolute", top: 2, left: isYearly ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.25s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
              </button>
              <span style={{ fontSize: 13, fontWeight: 600, color: isYearly ? "#fff" : "#8888a8" }}>
                Anual <span style={{ color: "#6c63ff" }}>(−20%)</span>
              </span>
            </div>
          )}

          {/* Badge plan */}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#a78bfa", marginBottom: 12 }}>
            {data.planName}
          </div>

          {/* Ofertă lansare */}
          {!isBusiness && (
            <div style={{ marginBottom: 16 }}>
              <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: "rgba(108,99,255,0.15)", color: "#a78bfa", border: "1px solid rgba(108,99,255,0.3)", letterSpacing: "0.5px" }}>
                Ofertă lansare -40%
              </span>
            </div>
          )}

          {/* Preț */}
          {!isBusiness && price && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-2px", color: "#fff" }}>{price}</span>
                <span style={{ fontSize: 16, color: "#8888a8" }}>RON</span>
                {originalPrice && (
                  <span style={{ fontSize: 15, color: "#555570", textDecoration: "line-through", marginLeft: 4 }}>{originalPrice} RON</span>
                )}
              </div>
              <div style={{ fontSize: 13, color: "#8888a8", marginTop: 4 }}>
                / lună · {isYearly ? "facturat anual" : "facturat lunar"}
              </div>
            </div>
          )}

          {/* Features */}
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {data.planFeatures.map((f, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "#a78bfa", flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ fontSize: 14, color: "#b0b0c8" }}>{f}</span>
              </li>
            ))}
          </ul>

          <div style={{ height: 1, background: "#1f1f2e", marginBottom: 24 }} />

          {/* Form */}
          <WaitlistForm sursa={sursa} isBusiness={isBusiness} />

          {/* Trust badges */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 20, paddingTop: 20, borderTop: "1px solid #1f1f2e" }}>
            {data.trustBadges.map(b => (
              <span key={b} style={{ fontSize: 12, color: "#8888a8", fontWeight: 500 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER minimal */}
      <div style={{ borderTop: "1px solid #1f1f2e", padding: "24px 40px", textAlign: "center" }}>
        <span style={{ fontSize: 13, color: "#555570" }}>© 2025 EduAI by Nesco Digital · <a href="/" style={{ color: "#8888a8", textDecoration: "none" }}>Site principal</a></span>
      </div>
    </div>
  );
}
