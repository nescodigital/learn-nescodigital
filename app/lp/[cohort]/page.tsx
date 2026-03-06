"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { Pricing } from "@/components/blocks/pricing";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { Rocket, Megaphone, Zap, MessageSquare, BarChart2, Bot, TrendingUp, Users } from "lucide-react";
import { SegmentationModal } from "@/components/ui/segmentation-modal";

// ─── LOGOS ────────────────────────────────────────────────────────────────────

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

// ─── TESTIMONIALE ─────────────────────────────────────────────────────────────

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

// ─── CATALOG ──────────────────────────────────────────────────────────────────

const BENTO_ITEMS: BentoItem[] = [
  { title: "AI pentru Antreprenori Români", meta: "18 lecții · 4h 30m", description: "Automatizează decizii, generează rapoarte și câștigă timp cu instrumentele AI potrivite pentru afacerea ta.", icon: <Rocket style={{ width: 16, height: 16, color: "#a78bfa" }} />, status: "Popular", tags: ["Antreprenoriat", "Începător"], hasPersistentHover: true, cta: "Înscrie-te →" },
  { title: "Automatizări n8n & Zapier", meta: "26 lecții · 6h 45m", description: "Fluxuri automate fără cod. Conectează aplicații, elimină munca repetitivă.", icon: <Zap style={{ width: 16, height: 16, color: "#a78bfa" }} />, status: "Nou", tags: ["Automatizări", "Intermediar"], cta: "Înscrie-te →" },
  { title: "Agenți AI pentru Business", meta: "24 lecții · 6h 00m", description: "Creează agenți AI care lucrează autonom: cercetare, raportare, comunicare.", icon: <Bot style={{ width: 16, height: 16, color: "#a78bfa" }} />, status: "Avansat", tags: ["Automatizări", "Avansat"], cta: "Înscrie-te →" },
  { title: "Marketing Digital cu AI", meta: "22 lecții · 5h 15m", description: "Campanii mai bune în mai puțin timp. Copywriting, segmentare, A/B testing, totul cu AI.", icon: <Megaphone style={{ width: 16, height: 16, color: "#a78bfa" }} />, tags: ["Marketing", "Intermediar"], cta: "Înscrie-te →" },
  { title: "AI în Vânzări B2B", meta: "20 lecții · 5h", description: "Prospectat inteligent, email outreach personalizat la scară, CRM automatizat.", icon: <TrendingUp style={{ width: 16, height: 16, color: "#a78bfa" }} />, tags: ["Vânzări", "Intermediar"], cta: "Înscrie-te →" },
  { title: "Content AI pentru Business", meta: "14 lecții · 3h 20m", description: "Generează articole, postări social media și emailuri care sună uman și convertesc.", icon: <MessageSquare style={{ width: 16, height: 16, color: "#a78bfa" }} />, tags: ["Content", "Începător"], cta: "Înscrie-te →" },
  { title: "AI în Finanțe și Contabilitate", meta: "16 lecții · 4h", description: "Analiză financiară, forecast și automatizarea rapoartelor contabile cu AI.", icon: <BarChart2 style={{ width: 16, height: 16, color: "#a78bfa" }} />, tags: ["Finanțe", "Intermediar"], cta: "Înscrie-te →" },
  { title: "AI în Resurse Umane", meta: "12 lecții · 3h", description: "Recrutare mai rapidă, onboarding automatizat și evaluări de performanță cu AI.", icon: <Users style={{ width: 16, height: 16, color: "#a78bfa" }} />, status: "Nou", tags: ["HR", "Începător"], cta: "Înscrie-te →" },
  { title: "12+ cursuri în pregătire", meta: "în curând", description: "Noi module despre AI în educație, sănătate, retail și multe altele. Abonații de pe waitlist află primii.", icon: <Zap style={{ width: 16, height: 16, color: "rgba(255,255,255,0.3)" }} />, tags: ["Coming soon"], cta: "Fii primul →" },
];

// ─── PLANURI ──────────────────────────────────────────────────────────────────

const ALL_PLANS = {
  starter: { name: "STARTER", price: "197", yearlyPrice: "157", originalPrice: "329", originalYearlyPrice: "262", period: "lună", features: ["Acces la toate cursurile", "Quiz după fiecare lecție", "Actualizări de conținut incluse", "Suport email"], description: "Tot ce ai nevoie ca să nu rămâi în urmă.", buttonText: "Rezervă-mi locul →", href: "#waitlist", isPopular: false, isBusiness: false },
  pro: { name: "PRO", price: "297", yearlyPrice: "238", originalPrice: "495", originalYearlyPrice: "397", period: "lună", features: ["Tot ce include Starter", "Acces prioritar la cursuri noi", "Resurse descărcabile (templates, prompturi, checklist-uri)", "Suport prioritar (răspuns mai rapid față de Starter)", "Certificat digital recunoscut (după min. 6 luni)"], description: "Pentru cei care nu își permit să rămână în urmă. Certificat inclus.", buttonText: "Vreau Pro →", href: "#waitlist", isPopular: true, isBusiness: false },
  business: { name: "BUSINESS", price: "2990", yearlyPrice: "2990", originalPrice: "", originalYearlyPrice: "", period: "6 luni · minim 3 licențe", features: ["Tot ce include Pro pentru fiecare licență", "Minim 3 licențe per echipă", "Certificat digital pentru toți membrii", "Raport progres per angajat", "Onboarding dedicat"], description: "Pregătește-ți întreaga echipă. Prețul include minim 3 licențe Pro.", buttonText: "Solicită ofertă", href: "mailto:hello@nescodigital.ro?subject=Oferta%20Business%20EduAI", isPopular: false, isBusiness: true },
};

// ─── CONȚINUT PER COHORTĂ ─────────────────────────────────────────────────────

const COHORT_DATA = {
  angajat: {
    badge: "Pentru angajați și profesioniști",
    headline: "AI-ul nu îți ia jobul.",
    headlineSub: "Îl ia cel care știe să-l folosească.",
    knife: "Colegul tău mai tânăr știe deja. Tu mai ai timp, dar nu mult.",
    subheadline: "Cursuri video în română, cu exemple din piața românească. Automatizări, vânzări și AI. Aplici din prima săptămână.",
    painPoints: [
      { icon: "😰", title: "Simți că rămâi în urmă?", text: "Colegii tăi finalizează în 2 ore ce tu faci în 8. Nu e că muncesc mai mult, folosesc AI." },
      { icon: "💼", title: "Jobul tău nu mai e sigur ca înainte.", text: "La următoarea restructurare, primii care pleacă sunt cei fără competențe noi. AI literacy nu mai e opțional." },
      { icon: "⏳", title: "Știi că trebuie să înveți, dar tot amâni.", text: "Fiecare săptămână pierdută e o săptămână în care alții avansează. Nu e nevoie să fii expert, e nevoie să începi." },
    ],
    midCta: "Nu lăsa altcineva să îți ia locul. Înscrie-te acum.",
    catalogTitle: "Ce vei învăța",
    catalogDesc: "8 cursuri la lansare, 12+ în pregătire. Toate în română, toate cu exerciții practice.",
    testimonialsTitle: "Ce spun cei care nu au mai așteptat",
    testimonialsDesc: "Angajați și profesioniști din România care au ales să nu rămână în urmă.",
    pricingKnife: "Primii 500 de înscriși primesc preț special de lansare, disponibil exclusiv pe waitlist.",
    planKeys: ["starter", "pro"] as const,
  },
  antreprenor: {
    badge: "Pentru antreprenori și freelanceri",
    headline: "Fără AI, pierzi bani.",
    headlineSub: "Fiecare zi costă.",
    knife: "Concurenții tăi automatizează deja. Tu faci manual ce ei fac în 10 minute.",
    subheadline: "Cursuri în română cu exemple reale. Automatizări, marketing, vânzări și AI. ROI vizibil din prima lună.",
    painPoints: [
      { icon: "💸", title: "Plătești salarii pentru muncă repetitivă.", text: "Email-uri, rapoarte, follow-up-uri, toate se automatizează. Tu plătești oameni pentru taskuri pe care AI-ul le face instant." },
      { icon: "🕐", title: "Timpul tău e cel mai scump activ.", text: "Ca antreprenor, pierzi ore pe taskuri administrative în loc să crești businessul. Asta trebuie să se schimbe." },
      { icon: "🏃", title: "Concurența se mișcă mai repede.", text: "Firmele care adoptă AI acum vor domina piața în 2 ani. Cele care nu adoptă vor lupta pentru supraviețuire." },
    ],
    midCta: "Automatizează acum. Fiecare zi pierdută costă.",
    catalogTitle: "Ce vei automatiza",
    catalogDesc: "8 cursuri la lansare, 12+ în pregătire. Toate aplicabile direct în businessul tău.",
    testimonialsTitle: "Ce spun antreprenorii care au aplicat",
    testimonialsDesc: "Fondatori și freelanceri din România care și-au automatizat businessul.",
    pricingKnife: "Preț special de lansare -40%. Disponibil doar pentru primii 500 înscriși pe waitlist.",
    planKeys: ["starter", "pro", "business"] as const,
  },
  manager: {
    badge: "Pentru manageri și directori",
    headline: "Echipa ta rămâne în urmă.",
    headlineSub: "Tu ești responsabil.",
    knife: "Dacă echipa ta nu știe AI, tu nu ai câștigat nimic.",
    subheadline: "Training structurat în română, cu certificat per angajat și raport de progres inclus.",
    painPoints: [
      { icon: "👥", title: "Angajații rezistă la schimbare.", text: "Fără training structurat, AI-ul rămâne un buzzword în echipa ta. Oamenii nu adoptă ce nu înțeleg." },
      { icon: "📋", title: "Nu ai un program clar de upskilling.", text: "Fiecare face ce vrea, nimeni nu are o direcție clară. Rezultatul: timp pierdut și frustrare." },
      { icon: "📄", title: "Nu poți demonstra ROI-ul trainingului.", text: "Fără certificate și rapoarte de progres, investiția e greu de justificat. Noi rezolvăm asta." },
    ],
    midCta: "Pregătește-ți echipa înainte să fie prea târziu.",
    catalogTitle: "Ce va învăța echipa ta",
    catalogDesc: "8 cursuri la lansare, 12+ în pregătire. Toate cu certificat digital recunoscut.",
    testimonialsTitle: "Ce spun managerii care au instruit echipele",
    testimonialsDesc: "Directori și HR manageri din România care au pregătit echipe întregi.",
    pricingKnife: "Certificat pentru toți membrii echipei. Raport de progres per angajat inclus.",
    planKeys: ["pro", "business"] as const,
  },
};

type CohortKey = keyof typeof COHORT_DATA;

// ─── WAITLIST FORM ────────────────────────────────────────────────────────────

function WaitlistForm({ sursa, label = "Rezervă-mi locul acum →", onSuccess }: { sursa: string; label?: string; onSuccess?: (email: string) => void }) {
  const [form, setForm] = useState({ nume: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, sursa }) });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? "A apărut o eroare."); setStatus("error"); return; }
      setStatus("success");
      onSuccess?.(form.email);
    } catch { setErrorMsg("A apărut o eroare. Încearcă din nou."); setStatus("error"); }
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
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input className="form-input" type="text" placeholder="Prenume (opțional)" value={form.nume} onChange={(e) => setForm(f => ({ ...f, nume: e.target.value }))} />
        <input className="form-input" type="email" placeholder="Email *" required value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
        {status === "error" && <div style={{ fontSize: 13, color: "#f87171", padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8 }}>{errorMsg}</div>}
        <button type="submit" className="btn-primary-lg" disabled={status === "loading"} style={{ width: "100%", marginTop: 4 }}>
          {status === "loading" ? "Se înscrie..." : label}
        </button>
      </div>
    </form>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg2)", padding: "40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, textAlign: "center" }}>
        {[
          { value: "8+", label: "Cursuri la lansare" },
          { value: "100%", label: "Conținut în română" },
          { value: "500+", label: "Studenți în waitlist" },
          { value: "✓", label: "Preț special waitlist" },
        ].map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1, background: "linear-gradient(135deg, #fff 30%, var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FIXED BOTTOM CTA (mobile) ────────────────────────────────────────────────

function FixedBottomCta({ sursa }: { sursa: string }) {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, sursa: `${sursa}-fixed-cta` }) });
      if (res.ok) setSubmitted(true);
    } catch {}
    setLoading(false);
  }

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999, background: "rgba(13,13,18,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border2)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}
      className="show-mobile-only">
      {submitted ? (
        <div style={{ flex: 1, textAlign: "center", fontSize: 15, fontWeight: 600, color: "#a78bfa" }}>🎉 Ești pe listă!</div>
      ) : (
        <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", gap: 10 }}>
          <input type="email" placeholder="Email-ul tău" required value={email} onChange={(e) => setEmail(e.target.value)}
            style={{ flex: 1, background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 14, fontFamily: "inherit", outline: "none", minWidth: 0 }} />
          <button type="submit" disabled={loading}
            style={{ padding: "11px 18px", borderRadius: 10, background: "linear-gradient(135deg, #6c63ff, #a78bfa)", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            {loading ? "..." : "Rezervă →"}
          </button>
        </form>
      )}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

function LpPageInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const cohort = (params?.cohort as string)?.toLowerCase() as CohortKey;
  const data = COHORT_DATA[cohort] ?? COHORT_DATA.angajat;
  const sursa = searchParams?.get("src") ?? `lp-${cohort}`;
  const plans = data.planKeys.map(k => ALL_PLANS[k]);
  const [modalEmail, setModalEmail] = useState<string | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "Inter, -apple-system, sans-serif", paddingBottom: 80 }}>

      {/* NAV — logo centrat */}
      <nav style={{ padding: "18px 40px", display: "flex", justifyContent: "center", borderBottom: "1px solid var(--border)", background: "rgba(13,13,18,0.9)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 200 }}>
        <img src="/logo.png" alt="EduAI" style={{ height: 30, width: "auto" }} />
      </nav>

      {/* HERO */}
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(10, 8, 20)"
        gradientBackgroundEnd="rgb(18, 10, 40)"
        firstColor="108, 99, 255" secondColor="140, 100, 255" thirdColor="80, 60, 200"
        fourthColor="60, 40, 160" fifthColor="120, 80, 240" pointerColor="108, 99, 255"
        size="60%" blendingValue="screen" containerClassName="hero" className="w-full h-full"
      >
        <div className="hero-grid-bg" />
        <div className="hero-inner" style={{ textAlign: "center" }}>
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>{data.badge}</span>
          </div>

          <h1 className="hero-h1" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", maxWidth: 640, margin: "0 auto 20px" }}>
            <span className="grad">{data.headline}</span>
            <br />{data.headlineSub}
          </h1>

          <p className="hero-sub" style={{ marginBottom: 12 }}>{data.subheadline}</p>

          {/* CUȚIT ÎN RANĂ sub subheadline */}
          <p style={{ fontWeight: 700, fontSize: "clamp(15px, 1.8vw, 18px)", color: "#fff", margin: "0 auto 28px", maxWidth: 560, lineHeight: 1.5 }}>
            {data.knife}
          </p>

          {/* FORM CARD */}
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 16, padding: "32px", maxWidth: 520, width: "100%", margin: "0 auto" }}>
            <WaitlistForm sursa={sursa} onSuccess={setModalEmail} />
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
              {["✓ 100% în română", "✓ Certificat la final", "✓ Preț special waitlist"].map(t => (
                <span key={t} style={{ fontSize: 13, color: "var(--muted2)", fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>

      {/* STATS BAR */}
      <StatsBar />

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

      {/* MID CTA */}
      <div style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "48px 32px", textAlign: "center" }}>
        <p style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, color: "#fff", marginBottom: 24, maxWidth: 600, margin: "0 auto 24px" }}>{data.midCta}</p>
        <div style={{ maxWidth: 460, margin: "0 auto" }}>
          <WaitlistForm sursa={`${sursa}-mid`} label="Vreau acces anticipat →" onSuccess={setModalEmail} />
        </div>
      </div>

      {/* LOGO CLOUD */}
      <div style={{ background: "var(--bg)" }}>
        <LogoCloud logos={AI_LOGOS} title="Instrumente urmărite și testate de noi." subtitle="Cele mai relevante pentru business-ul tău." style={{ margin: "0 auto" }} />
      </div>

      {/* CATALOG */}
      <div className="section" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-inner">
          <div className="section-eyebrow">Catalog</div>
          <h2 className="section-title">{data.catalogTitle}</h2>
          <p className="section-sub">{data.catalogDesc}</p>
          <BentoGrid items={BENTO_ITEMS} />
        </div>
      </div>

      {/* TESTIMONIALE */}
      <div className="section">
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
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

      {/* PRICING */}
      <div id="pricing-section" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ textAlign: "center", paddingTop: 48, paddingBottom: 0, paddingLeft: 32, paddingRight: 32 }}>
          <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 700, color: "#a78bfa", maxWidth: 640, margin: "0 auto" }}>
            {data.pricingKnife}
          </p>
        </div>
        <Pricing plans={plans} title="Simplu și transparent" description="Fără surprize. Acces complet, actualizări incluse." />
      </div>

      {/* FINAL CTA */}
      <div className="cta-section">
        <div className="cta-glow" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-eyebrow" style={{ display: "block", marginBottom: 12 }}>Gata să începi?</div>
          <h2 className="section-title" style={{ marginBottom: 12 }}>Fii printre primii 500.</h2>
          <p className="section-sub" style={{ margin: "0 auto 36px" }}>Primii 500 de înscriși primesc preț special de lansare, disponibil exclusiv pe waitlist.</p>
          <div style={{ maxWidth: 460, margin: "0 auto" }}>
            <WaitlistForm sursa={`${sursa}-bottom`} label="Vreau acces anticipat →" onSuccess={setModalEmail} />
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>Fără card de credit. Anulezi oricând.</div>
        </div>
      </div>

      {/* FIXED BOTTOM CTA — doar pe mobile */}
      <FixedBottomCta sursa={sursa} />

      <SegmentationModal
        email={modalEmail ?? ""}
        isOpen={!!modalEmail}
        onClose={() => setModalEmail(null)}
      />

    </div>
  );
}

export default function LpPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--bg)" }} />}>
      <LpPageInner />
    </Suspense>
  );
}
