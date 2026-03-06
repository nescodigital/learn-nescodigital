"use client";

import { useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { Pricing } from "@/components/blocks/pricing";

// ─── LOGOS (identice cu pagina principală) ────────────────────────────────────

const AI_LOGOS = [
  { src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" },
  { src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg", alt: "Claude" },
  { src: "https://svgl.app/library/gemini_wordmark.svg", alt: "Gemini" },
  { src: "https://svgl.app/library/perplexity_wordmark_light.svg", alt: "Perplexity" },
  { src: "https://svgl.app/library/grok-wordmark-light.svg", alt: "Grok" },
  { src: "https://svgl.app/library/n8n-wordmark-light.svg", alt: "n8n" },
  { src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase" },
  { src: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/meta-text.svg", alt: "Llama" },
  { src: "https://svgl.app/library/microsoft-copilot.svg", alt: "Copilot" },
  { src: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/midjourney-text.svg", alt: "Midjourney" },
];

// ─── TESTIMONIALE (identice cu pagina principală) ─────────────────────────────

const TESTIMONIALS: Testimonial[] = [
  { text: "Am automatizat complet prospectarea. 40 de lead-uri calificate pe săptămână fără să ating tastatura. ROI în prima lună.", image: "https://randomuser.me/api/portraits/men/32.jpg", name: "Mihai D.", role: "Fondator, Agenție Imobiliară" },
  { text: "Cursul de n8n mi-a eliminat 15 ore de muncă manuală pe săptămână. Cel mai practic lucru din ultimul an.", image: "https://randomuser.me/api/portraits/women/44.jpg", name: "Ana P.", role: "Marketing Manager" },
  { text: "Fără background tehnic am implementat automatizări care m-au ajutat să compet cu firme mult mai mari.", image: "https://randomuser.me/api/portraits/men/36.jpg", name: "Radu T.", role: "CEO, E-commerce" },
  { text: "Cursurile sunt extrem de practice. Am aplicat primele automatizări chiar în timpul modulului 2.", image: "https://randomuser.me/api/portraits/women/68.jpg", name: "Ioana M.", role: "Antreprenor" },
  { text: "Content-ul AI generat cu metodele din curs a triplat engagement-ul pe LinkedIn în 3 săptămâni.", image: "https://randomuser.me/api/portraits/men/76.jpg", name: "Andrei S.", role: "Consultant B2B" },
  { text: "Am construit un agent AI care trimite rapoarte săptămânale automat. Echipa mea e șocată.", image: "https://randomuser.me/api/portraits/women/12.jpg", name: "Cristina B.", role: "Operations Director" },
  { text: "Recomand oricui vrea să rămână relevant în domeniu. AI-ul nu îți ia locul, dar cel care știe AI da.", image: "https://randomuser.me/api/portraits/men/88.jpg", name: "Dan F.", role: "Sales Manager" },
  { text: "Modulul de email marketing cu AI mi-a crescut rata de deschidere cu 34%. Rezultate reale.", image: "https://randomuser.me/api/portraits/women/23.jpg", name: "Laura V.", role: "E-commerce Owner" },
  { text: "Platforma e bine structurată și explicațiile sunt clare. Exact ce lipsea pe piața românească.", image: "https://randomuser.me/api/portraits/men/61.jpg", name: "Bogdan C.", role: "Product Manager" },
];

// ─── PLANURI ──────────────────────────────────────────────────────────────────

const ALL_PLANS = {
  starter: {
    name: "STARTER",
    price: "197",
    yearlyPrice: "157",
    originalPrice: "329",
    originalYearlyPrice: "262",
    period: "lună",
    features: ["Acces la toate cursurile", "Quiz după fiecare lecție", "Actualizări de conținut incluse", "Suport email"],
    description: "Tot ce ai nevoie ca să nu rămâi în urmă.",
    buttonText: "Rezervă-mi locul →",
    href: "#waitlist",
    isPopular: false,
    isBusiness: false,
  },
  pro: {
    name: "PRO",
    price: "297",
    yearlyPrice: "238",
    originalPrice: "495",
    originalYearlyPrice: "397",
    period: "lună",
    features: ["Tot ce include Starter", "Acces prioritar la cursuri noi", "Resurse descărcabile (templates, prompturi, checklist-uri)", "Suport prioritar — răspuns în față față de Starter", "Certificat digital recunoscut (după min. 6 luni)"],
    description: "Pentru cei care nu își permit să rămână în urmă. Certificat inclus.",
    buttonText: "Vreau Pro →",
    href: "#waitlist",
    isPopular: true,
    isBusiness: false,
  },
  business: {
    name: "BUSINESS",
    price: "2990",
    yearlyPrice: "2990",
    originalPrice: "",
    originalYearlyPrice: "",
    period: "6 luni · minim 3 licențe",
    features: ["Tot ce include Pro pentru fiecare licență", "Minim 3 licențe per echipă", "Certificat digital pentru toți membrii", "Raport progres per angajat", "Onboarding dedicat"],
    description: "Pregătește-ți întreaga echipă. Prețul include minim 3 licențe Pro.",
    buttonText: "Solicită ofertă",
    href: "mailto:hello@nescodigital.ro?subject=Oferta%20Business%20EduAI",
    isPopular: false,
    isBusiness: true,
  },
};

// ─── CONȚINUT PER COHORTĂ ─────────────────────────────────────────────────────

const COHORT_DATA = {
  angajat: {
    badge: "Pentru angajați și profesioniști",
    headline: "AI-ul nu îți ia jobul.",
    headlineSub: "Îl ia cel care știe să-l folosească.",
    subheadline: "Colegul tău mai tânăr știe deja. Managerul tău se uită la cifre. Mai ai timp să înveți — dar nu mult.",
    painPoints: [
      { icon: "😰", title: "Simți că rămâi în urmă?", text: "Colegii tăi finalizează în 2 ore ce tu faci în 8. Nu e că muncesc mai mult — folosesc AI." },
      { icon: "💼", title: "Jobul tău nu mai e sigur ca înainte.", text: "La următoarea restructurare, primii care pleacă sunt cei care nu aduc valoare nouă. Competențele AI nu mai sunt opționale." },
      { icon: "⏳", title: "Știi că trebuie să înveți, dar tot amâni.", text: "Fiecare săptămână pierdută e o săptămână în care alții avansează. Nu e nevoie să fii expert — e nevoie să începi." },
    ],
    ctaHeadline: "Simplu și transparent",
    ctaDesc: "Fără surprize. Preț special de lansare, disponibil doar pe waitlist.",
    planKeys: ["starter", "pro"] as const,
    testimonialsTitle: "Ce spun cei care nu au mai așteptat",
    testimonialsDesc: "Angajați și profesioniști din România care au ales să nu rămână în urmă.",
  },
  antreprenor: {
    badge: "Pentru antreprenori și freelanceri",
    headline: "Businessul tău pierde bani",
    headlineSub: "în fiecare zi fără AI.",
    subheadline: "Concurenții tăi automatizează deja. Tu încă faci manual ce ei fac în 10 minute.",
    painPoints: [
      { icon: "💸", title: "Plătești oameni pentru muncă repetitivă.", text: "Email-uri, rapoarte, follow-up-uri — toate se pot automatiza. Tu plătești salarii pentru taskuri pe care AI-ul le face instant." },
      { icon: "🕐", title: "Timpul tău valorează cel mai mult.", text: "Ca antreprenor, pierzi ore pe taskuri administrative în loc să crești businessul. AI rezolvă asta." },
      { icon: "🏃", title: "Concurența se mișcă mai repede ca tine.", text: "Firmele care adoptă AI acum vor domina piața în 2 ani. Cele care nu adoptă vor lupta pentru supraviețuire." },
    ],
    ctaHeadline: "Simplu și transparent",
    ctaDesc: "Fără surprize. Preț special de lansare, disponibil doar pe waitlist.",
    planKeys: ["starter", "pro", "business"] as const,
    testimonialsTitle: "Ce spun antreprenorii care au aplicat",
    testimonialsDesc: "Fondatori și freelanceri din România care și-au automatizat businessul.",
  },
  manager: {
    badge: "Pentru manageri și directori",
    headline: "Echipa ta va fi depășită",
    headlineSub: "dacă nu acționezi acum.",
    subheadline: "Nu e suficient să știi tu AI. Dacă echipa ta nu știe, productivitatea nu crește.",
    painPoints: [
      { icon: "👥", title: "Angajații rezistă la schimbare.", text: "Știi că AI-ul poate transforma modul în care lucrează echipa ta, dar oamenii evită să-l adopte fără training structurat." },
      { icon: "📋", title: "Nu ai un program clar de upskilling.", text: "Fiecare face ce vrea, nimeni nu are o direcție clară. Rezultatul: haos și timp pierdut." },
      { icon: "📄", title: "Nu poți demonstra ROI-ul trainingului.", text: "Fără certificate și rapoarte de progres, investiția în training e greu de justificat. Noi rezolvăm asta." },
    ],
    ctaHeadline: "Simplu și transparent",
    ctaDesc: "Certificat pentru toți membrii echipei. Raport progres per angajat.",
    planKeys: ["pro", "business"] as const,
    testimonialsTitle: "Ce spun managerii care au instruit echipele",
    testimonialsDesc: "Directori și HR manageri din România care au pregătit echipe întregi.",
  },
};

type CohortKey = keyof typeof COHORT_DATA;

// ─── WAITLIST FORM ────────────────────────────────────────────────────────────

function WaitlistForm({ sursa }: { sursa: string }) {
  const [form, setForm] = useState({ nume: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sursa }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? "A apărut o eroare."); setStatus("error"); return; }
      setStatus("success");
    } catch {
      setErrorMsg("A apărut o eroare. Încearcă din nou.");
      setStatus("error");
    }
  }

  if (status === "success") return (
    <div style={{ textAlign: "center", padding: "16px 0" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Ești pe listă!</div>
      <div style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6 }}>Te anunțăm la lansare cu preț special pentru cei de pe waitlist.</div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input className="form-input" type="text" placeholder="Prenume (opțional)" value={form.nume} onChange={(e) => setForm(f => ({ ...f, nume: e.target.value }))} />
        <input className="form-input" type="email" placeholder="Email *" required value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
        {status === "error" && (
          <div style={{ fontSize: 13, color: "#f87171", padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8 }}>{errorMsg}</div>
        )}
        <button type="submit" className="btn-primary-lg" disabled={status === "loading"} style={{ width: "100%", marginTop: 4 }}>
          {status === "loading" ? "Se înscrie..." : "Rezervă-mi locul acum →"}
        </button>
      </div>
    </form>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function LpPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const cohort = (params?.cohort as string)?.toLowerCase() as CohortKey;
  const data = COHORT_DATA[cohort] ?? COHORT_DATA.angajat;
  const sursa = searchParams?.get("src") ?? `lp-${cohort}`;

  const plans = data.planKeys.map(k => ALL_PLANS[k]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "Inter, -apple-system, sans-serif" }}>

      {/* NAV — logo centrat, nimic altceva */}
      <nav style={{ padding: "20px 40px", display: "flex", justifyContent: "center", borderBottom: "1px solid var(--border)", background: "rgba(13,13,18,0.85)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 200 }}>
        <img src="/logo.png" alt="EduAI" style={{ height: 32, width: "auto" }} />
      </nav>

      {/* HERO cu background animat identic */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(10, 8, 20)"
        gradientBackgroundEnd="rgb(18, 10, 40)"
        firstColor="108, 99, 255"
        secondColor="140, 100, 255"
        thirdColor="80, 60, 200"
        fourthColor="60, 40, 160"
        fifthColor="120, 80, 240"
        pointerColor="108, 99, 255"
        size="60%"
        blendingValue="screen"
        containerClassName="hero"
        className="w-full h-full"
      >
        <div className="hero-grid-bg" />
        <div className="hero-inner" style={{ textAlign: "center" }}>
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>{data.badge}</span>
          </div>

          <h1 className="hero-h1">
            <span className="grad">{data.headline}</span>
            <br />
            {data.headlineSub}
          </h1>

          <p className="hero-sub">{data.subheadline}</p>

          {/* FORM CARD */}
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 16, padding: "32px", maxWidth: 520, width: "100%", margin: "32px auto 0" }}>
            <WaitlistForm sursa={sursa} />
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
              {["✓ 100% în română", "✓ Certificat la final", "✓ Preț special waitlist"].map(t => (
                <span key={t} style={{ fontSize: 13, color: "var(--muted2)", fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>

      {/* PAIN POINTS */}
      <div className="section">
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {data.painPoints.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 14, padding: "22px 24px" }}>
                <span style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{p.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LOGO CLOUD — identic cu pagina principală */}
      <div style={{ background: "var(--bg)" }}>
        <LogoCloud
          logos={AI_LOGOS}
          title="Instrumente urmărite și testate de noi."
          subtitle="Cele mai relevante pentru business-ul tău."
          style={{ margin: "0 auto" }}
        />
      </div>

      {/* TESTIMONIALE — identice cu pagina principală */}
      <div className="section">
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 540, margin: "0 auto 48px", textAlign: "center" }}
          >
            <div style={{ display: "inline-flex", border: "1px solid #2a2a3e", borderRadius: 8, padding: "4px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#a78bfa", marginBottom: 16 }}>
              Testimoniale
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>{data.testimonialsTitle}</h2>
            <p style={{ fontSize: 15, color: "#8888a8", lineHeight: 1.65 }}>{data.testimonialsDesc}</p>
          </motion.div>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, maxHeight: 700, overflow: "hidden", maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)" }}>
            <TestimonialsColumn testimonials={TESTIMONIALS.slice(0, 3)} duration={18} />
            <TestimonialsColumn testimonials={TESTIMONIALS.slice(3, 6)} duration={22} className="hidden-mobile" />
            <TestimonialsColumn testimonials={TESTIMONIALS.slice(6, 9)} duration={20} className="hidden-tablet" />
          </div>
        </div>
      </div>

      {/* PRICING — componenta identică cu pagina principală */}
      <div id="pricing-section" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <Pricing
          plans={plans}
          title={data.ctaHeadline}
          description={data.ctaDesc}
        />
      </div>

    </div>
  );
}
