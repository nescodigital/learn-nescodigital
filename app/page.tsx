"use client";

import { useState, useEffect, useRef } from "react";
import { Pricing } from "@/components/blocks/pricing";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Header } from "@/components/ui/header-2";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
import { Rocket, Megaphone, Zap, MessageSquare, BarChart2, Bot, TrendingUp, Users } from "lucide-react";

// Only wordmark SVGs (verified) — no icon-only logos
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

const TESTIMONIALS_COLUMNS: Testimonial[] = [
  {
    text: "Am automatizat complet prospectarea. 40 de lead-uri calificate pe săptămână fără să ating tastatura. ROI în prima lună.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Mihai D.",
    role: "Fondator, Agenție Imobiliară",
  },
  {
    text: "Cursul de n8n mi-a eliminat 15 ore de muncă manuală pe săptămână. Cel mai practic lucru din ultimul an.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Ana P.",
    role: "Marketing Manager",
  },
  {
    text: "Fără background tehnic am implementat automatizări care m-au ajutat să compet cu firme mult mai mari.",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    name: "Radu T.",
    role: "CEO, E-commerce",
  },
  {
    text: "Cursurile sunt extrem de practice. Am aplicat primele automatizări chiar în timpul modulului 2.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Ioana M.",
    role: "Antreprenor",
  },
  {
    text: "Content-ul AI generat cu metodele din curs a triplat engagement-ul pe LinkedIn în 3 săptămâni.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "Andrei S.",
    role: "Consultant B2B",
  },
  {
    text: "Am construit un agent AI care trimite rapoarte săptămânale automat. Echipa mea e șocată.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Cristina B.",
    role: "Operations Director",
  },
  {
    text: "Recomand oricui vrea să rămână relevant în domeniu. AI-ul nu îți ia locul, dar cel care știe AI da.",
    image: "https://randomuser.me/api/portraits/men/88.jpg",
    name: "Dan F.",
    role: "Sales Manager",
  },
  {
    text: "Modulul de email marketing cu AI mi-a crescut rata de deschidere cu 34%. Rezultate reale.",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    name: "Laura V.",
    role: "E-commerce Owner",
  },
  {
    text: "Platforma e bine structurată și explicațiile sunt clare. Exact ce lipsea pe piața românească.",
    image: "https://randomuser.me/api/portraits/men/61.jpg",
    name: "Bogdan C.",
    role: "Product Manager",
  },
];

const PRICING_PLANS = [
  {
    name: "LUNAR",
    price: "297",
    yearlyPrice: "238",
    period: "lună",
    features: [
      "Acces la toate cursurile",
      "Quiz după fiecare lecție",
      "Certificat digital la final",
      "Actualizări de conținut incluse",
      "Suport email",
    ],
    description: "Acces complet la toate cursurile. Anulezi oricând.",
    buttonText: "Începe acum",
    href: "#waitlist",
    isPopular: false,
  },
  {
    name: "ANUAL",
    price: "197",
    yearlyPrice: "157",
    period: "lună · facturat anual",
    features: [
      "Tot ce include Lunar",
      "Acces prioritar la cursuri noi",
      "Comunitate privată members-only",
      "Exerciții practice + proiecte reale",
      "Resurse descărcabile (templates, prompturi)",
    ],
    description: "Economisești 1.200 RON față de abonamentul lunar.",
    buttonText: "Cel mai ales plan",
    href: "#waitlist",
    isPopular: true,
  },
  {
    name: "LIFETIME",
    price: "1490",
    yearlyPrice: "1490",
    period: "o singură dată",
    features: [
      "Tot ce include Anual",
      "Acces pe viață la toate cursurile",
      "Toate cursurile viitoare incluse",
      "Pachet de prompturi premium (200+)",
      "Badge exclusiv în comunitate",
    ],
    description: "Plătești o dată, ai acces pentru totdeauna.",
    buttonText: "Vreau Lifetime",
    href: "#waitlist",
    isPopular: false,
  },
];

// ─── DATA ───────────────────────────────────────────────────────────────────

const INTERESTS = [
  "AI pentru Antreprenori",
  "Marketing Digital cu AI",
  "Automatizări n8n & Zapier",
  "Content AI pentru Business",
  "AI în Vânzări B2B",
  "AI în Resurse Umane",
  "AI în Finanțe",
  "Vreau acces la toate",
];

const COURSES = [
  {
    emoji: "🚀",
    cat: "Antreprenoriat",
    title: "AI pentru Antreprenori Români",
    desc: "Automatizează deciziile, generează rapoarte și câștigă timp cu instrumentele AI potrivite pentru afacerea ta.",
    lessons: 18,
    duration: "4h 30m",
    level: "beginner",
    badge: "popular",
    color: "linear-gradient(135deg,#1a1040,#2d1b69)",
  },
  {
    emoji: "📣",
    cat: "Marketing",
    title: "Marketing Digital cu AI",
    desc: "Campanii mai bune în mai puțin timp. Copywriting, segmentare, A/B testing, totul cu AI.",
    lessons: 22,
    duration: "5h 15m",
    level: "intermediate",
    badge: null,
    color: "linear-gradient(135deg,#0a2040,#1a4080)",
  },
  {
    emoji: "⚡",
    cat: "Automatizări",
    title: "Automatizări n8n & Zapier",
    desc: "Construiește fluxuri automate fără cod. Conectează aplicații, elimină munca repetitivă.",
    lessons: 26,
    duration: "6h 45m",
    level: "intermediate",
    badge: "new",
    color: "linear-gradient(135deg,#1a0a40,#3d1f80)",
  },
  {
    emoji: "💬",
    cat: "Content",
    title: "Content AI pentru Business",
    desc: "Generează articole, postări social media și emailuri care sună uman și convertesc.",
    lessons: 14,
    duration: "3h 20m",
    level: "beginner",
    badge: null,
    color: "linear-gradient(135deg,#0d2030,#1a5060)",
  },
  {
    emoji: "📊",
    cat: "Vânzări",
    title: "AI în Vânzări B2B",
    desc: "Prospectat inteligent, email outreach personalizat la scară, CRM automatizat.",
    lessons: 20,
    duration: "5h 00m",
    level: "intermediate",
    badge: null,
    color: "linear-gradient(135deg,#1a2010,#3a5020)",
  },
  {
    emoji: "🤖",
    cat: "Automatizări",
    title: "Agenți AI pentru Business",
    desc: "Creează agenți AI care lucrează autonom: cercetare, raportare, comunicare.",
    lessons: 24,
    duration: "6h 00m",
    level: "advanced",
    badge: "popular",
    color: "linear-gradient(135deg,#1a0a30,#401060)",
  },
  {
    emoji: "📈",
    cat: "Finanțe",
    title: "AI în Finanțe și Contabilitate",
    desc: "Analiză financiară, forecast și automatizarea rapoartelor contabile cu AI.",
    lessons: 16,
    duration: "4h 00m",
    level: "intermediate",
    badge: null,
    color: "linear-gradient(135deg,#102020,#204040)",
  },
  {
    emoji: "👥",
    cat: "HR",
    title: "AI în Resurse Umane",
    desc: "Recrutare mai rapidă, onboarding automatizat și evaluări de performanță cu AI.",
    lessons: 12,
    duration: "3h 00m",
    level: "beginner",
    badge: "new",
    color: "linear-gradient(135deg,#201010,#502020)",
  },
];

const BENTO_ITEMS: BentoItem[] = [
  {
    title: "AI pentru Antreprenori Români",
    meta: "18 lecții · 4h 30m",
    description: "Automatizează decizii, generează rapoarte și câștigă timp cu instrumentele AI potrivite pentru afacerea ta.",
    icon: <Rocket style={{ width: 16, height: 16, color: "#a78bfa" }} />,
    status: "Popular",
    tags: ["Antreprenoriat", "Începător"],
    hasPersistentHover: true,
    cta: "Înscrie-te →",
  },
  {
    title: "Automatizări n8n & Zapier",
    meta: "26 lecții · 6h 45m",
    description: "Fluxuri automate fără cod. Conectează aplicații, elimină munca repetitivă.",
    icon: <Zap style={{ width: 16, height: 16, color: "#a78bfa" }} />,
    status: "Nou",
    tags: ["Automatizări", "Intermediar"],
    cta: "Înscrie-te →",
  },
  {
    title: "Agenți AI pentru Business",
    meta: "24 lecții · 6h 00m",
    description: "Creează agenți AI care lucrează autonom: cercetare, raportare, comunicare.",
    icon: <Bot style={{ width: 16, height: 16, color: "#a78bfa" }} />,
    status: "Avansat",
    tags: ["Automatizări", "Avansat"],
    cta: "Înscrie-te →",
  },
  {
    title: "Marketing Digital cu AI",
    meta: "22 lecții · 5h 15m",
    description: "Campanii mai bune în mai puțin timp. Copywriting, segmentare, A/B testing, totul cu AI.",
    icon: <Megaphone style={{ width: 16, height: 16, color: "#a78bfa" }} />,
    tags: ["Marketing", "Intermediar"],
    cta: "Înscrie-te →",
  },
  {
    title: "AI în Vânzări B2B",
    meta: "20 lecții · 5h",
    description: "Prospectat inteligent, email outreach personalizat la scară, CRM automatizat.",
    icon: <TrendingUp style={{ width: 16, height: 16, color: "#a78bfa" }} />,
    tags: ["Vânzări", "Intermediar"],
    cta: "Înscrie-te →",
  },
  {
    title: "Content AI pentru Business",
    meta: "14 lecții · 3h 20m",
    description: "Generează articole, postări social media și emailuri care sună uman și convertesc.",
    icon: <MessageSquare style={{ width: 16, height: 16, color: "#a78bfa" }} />,
    tags: ["Content", "Începător"],
    cta: "Înscrie-te →",
  },
  {
    title: "AI în Finanțe și Contabilitate",
    meta: "16 lecții · 4h",
    description: "Analiză financiară, forecast și automatizarea rapoartelor contabile cu AI.",
    icon: <BarChart2 style={{ width: 16, height: 16, color: "#a78bfa" }} />,
    tags: ["Finanțe", "Intermediar"],
    cta: "Înscrie-te →",
  },
  {
    title: "AI în Resurse Umane",
    meta: "12 lecții · 3h",
    description: "Recrutare mai rapidă, onboarding automatizat și evaluări de performanță cu AI.",
    icon: <Users style={{ width: 16, height: 16, color: "#a78bfa" }} />,
    status: "Nou",
    tags: ["HR", "Începător"],
    cta: "Înscrie-te →",
  },
  {
    title: "12+ cursuri în pregătire",
    meta: "în curând",
    description: "Noi module despre AI în educație, sănătate, retail și multe altele. Abonații de pe waitlist află primii.",
    icon: <Zap style={{ width: 16, height: 16, color: "rgba(255,255,255,0.3)" }} />,
    tags: ["Coming soon"],
    cta: "Fii primul →",
  },
];

const TESTIMONIALS = [
  {
    init: "MD",
    name: "Mihai D.",
    role: "Fondator, Agenție Imobiliară",
    text: "Am automatizat complet prospectarea. 40 de lead-uri calificate pe săptămână fără să ating tastatura. ROI în prima lună.",
  },
  {
    init: "AP",
    name: "Ana P.",
    role: "Marketing Manager",
    text: "Cursul de n8n mi-a eliminat 15 ore de muncă manuală pe săptămână. Cel mai practic lucru din ultimul an.",
  },
  {
    init: "RT",
    name: "Radu T.",
    role: "CEO, E-commerce",
    text: "Fără background tehnic am implementat automatizări care m-au ajutat să compet cu firme mult mai mari.",
  },
];

const PLANS = [
  {
    name: "Lunar",
    price: "297",
    period: "/ lună",
    desc: "Acces complet la toate cursurile. Anulezi oricând.",
    feats: [
      "Acces la toate cursurile",
      "Quiz după fiecare lecție",
      "Certificat digital la final",
      "Actualizări de conținut incluse",
      "Suport email",
    ],
    btn: "Începe acum",
    btnClass: "plan-btn plan-btn-outline",
    featured: false,
  },
  {
    name: "Anual",
    price: "197",
    period: "/ lună · facturat anual",
    desc: "Economisești 1.200 RON față de abonamentul lunar.",
    feats: [
      "Tot ce include Lunar",
      "Acces prioritar la cursuri noi",
      "Comunitate privată members-only",
      "Exerciții practice + proiecte reale",
      "Resurse descărcabile (templates, prompturi)",
    ],
    btn: "Cel mai ales plan",
    btnClass: "plan-btn plan-btn-accent",
    featured: true,
    label: "Cel mai ales",
  },
  {
    name: "Lifetime",
    price: "1.490",
    period: "o singură dată",
    desc: "Plătești o dată, ai acces pentru totdeauna.",
    feats: [
      "Tot ce include Anual",
      "Acces pe viață la toate cursurile",
      "Toate cursurile viitoare incluse",
      "Pachet de prompturi premium (200+)",
      "Badge exclusiv în comunitate",
    ],
    btn: "Vreau Lifetime",
    btnClass: "plan-btn plan-btn-outline",
    featured: false,
  },
];

const CATEGORIES = ["Toate", "Antreprenoriat", "Marketing", "Automatizări", "Content", "Vânzări", "Finanțe", "HR"];

const ENROLLED = [
  { emoji: "🚀", title: "AI pentru Antreprenori Români", progress: 65, lessons: 18, done: 12 },
  { emoji: "⚡", title: "Automatizări n8n & Zapier", progress: 30, lessons: 26, done: 8 },
];

const STATS = [
  { label: "Lecții parcurse", value: "20" },
  { label: "Ore de curs", value: "4.5" },
  { label: "Cursuri înscrise", value: "2" },
  { label: "Certificate", value: "0" },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function LevelPill({ level }: { level: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    beginner: { cls: "lv-beginner", label: "Începător" },
    intermediate: { cls: "lv-intermediate", label: "Intermediar" },
    advanced: { cls: "lv-advanced", label: "Avansat" },
  };
  const { cls, label } = map[level] ?? map.beginner;
  return <span className={`level-pill ${cls}`}>{label}</span>;
}

// ─── PAGES ───────────────────────────────────────────────────────────────────

function HomePage({
  count,
  formRef,
  scrollToForm,
}: {
  count: number;
  formRef: React.RefObject<HTMLDivElement>;
  scrollToForm: () => void;
}) {
  const [form, setForm] = useState({ nume: "", email: "", interes: "" });
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
        body: JSON.stringify({ ...form, sursa: "direct" }),
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

  return (
    <>
      {/* HERO */}
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

        {/* Floating element — positioned absolute, right side, partially off-screen */}
        <img
          src="/hero-element.png"
          alt=""
          className="hero-float-img"
          style={{
            position: "absolute",
            right: "-160px",
            top: "120px",
            width: 588,
            opacity: 0.92,
            animation: "float 4s ease-in-out infinite",
            filter: "drop-shadow(0 24px 60px rgba(108,99,255,0.3))",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div className="hero-inner">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>
              <strong>{count > 0 ? count.toLocaleString("ro-RO") : "—"}</strong>{" "}
              persoane înscrise pe lista de așteptare
            </span>
          </div>

          <h1 className="hero-h1">
            <span className="grad">Cursuri AI practice</span>
            <br />
            pentru business-ul tău
          </h1>

          <p className="hero-sub">
            Cursuri video 100% în română cu exemple din piața românească.
            Automatizări, marketing, vânzări și AI. Aplici din prima săptămână.
            Certificat la final.
          </p>

          {/* FORM CARD */}
          <div
            ref={formRef}
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border2)",
              borderRadius: 16,
              padding: "32px",
              maxWidth: 520,
              width: "100%",
              margin: "0 auto",
            }}
          >
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                  Ești pe listă!
                </div>
                <div style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6 }}>
                  Te anunțăm la lansare cu preț special, cu 40% reducere față de prețul public.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Prenume (opțional)"
                    value={form.nume}
                    onChange={(e) => setForm((f) => ({ ...f, nume: e.target.value }))}
                  />
                  <input
                    className="form-input"
                    type="email"
                    placeholder="Email *"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                  <select
                    className="form-select"
                    value={form.interes}
                    onChange={(e) => setForm((f) => ({ ...f, interes: e.target.value }))}
                  >
                    <option value="">Ce curs te interesează primul?</option>
                    {INTERESTS.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>

                  {status === "error" && (
                    <div style={{
                      fontSize: 13, color: "#f87171",
                      padding: "10px 14px",
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: 8,
                    }}>
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-primary-lg"
                    disabled={status === "loading"}
                    style={{ width: "100%", marginTop: 4 }}
                  >
                    {status === "loading" ? "Se înscrie..." : "Vreau acces anticipat →"}
                  </button>
                </div>
              </form>
            )}

            <div style={{
              display: "flex", gap: 20, justifyContent: "center",
              flexWrap: "wrap", marginTop: 20, paddingTop: 20,
              borderTop: "1px solid var(--border)",
            }}>
              {["✓ 100% în română", "✓ Certificat la final", "✓ Preț lansare -40%"].map((t) => (
                <span key={t} style={{ fontSize: 13, color: "var(--muted2)", fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>

      {/* STATS */}
      <div style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg2)",
        padding: "40px",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 32, textAlign: "center",
        }}>
          {[
            { value: "8+", label: "Cursuri la lansare" },
            { value: "100%", label: "Conținut în română" },
            { value: "500+", label: "Studenți în waitlist" },
            { value: "-40%", label: "Preț de lansare" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1, background: "linear-gradient(135deg, #fff 30%, var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="section">
        <div className="section-inner">
          <div className="section-eyebrow">De ce Edu-AI</div>
          <h2 className="section-title">Înveți și aplici din prima săptămână</h2>
          <p className="section-sub">
            Nu teorie pentru examen. Cursuri construite cu exemple reale din piața românească.
          </p>
          <div className="features-grid">
            {[
              { icon: "🇷🇴", title: "100% în română", desc: "Toate cursurile sunt filmate și explicate în română, cu exemple din piața locală." },
              { icon: "⚡", title: "Aplici imediat", desc: "Fiecare lecție are un exercițiu practic. Nu ieși cu teorie, ieși cu ceva construit." },
              { icon: "🏆", title: "Certificat recunoscut", desc: "Certificat digital la finalul fiecărui curs, pe care îl poți adăuga pe LinkedIn." },
              { icon: "🔄", title: "Actualizat continuu", desc: "AI evoluează rapid. Actualizăm cursurile gratuit. Plătești o dată, primești mereu ce e actual." },
              { icon: "👥", title: "Comunitate activă", desc: "Forum privat cu studenți și instructori. Pui întrebări, primești răspunsuri reale." },
              { icon: "📱", title: "Oricând, oriunde", desc: "Accesezi de pe orice dispozitiv. Lecții de 5-15 minute. Înveți în pauza de cafea." },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI TOOLS STRIP */}
      <div style={{ background: "var(--bg)" }}>
        <LogoCloud
          logos={AI_LOGOS}
          title="Instrumente urmărite și testate de noi."
          subtitle="Cele mai relevante pentru business-ul tău."
          style={{ margin: '0 auto' }}
        />
      </div>

      {/* CURSURI PREVIEW */}
      <div style={{ height: 15, background: "var(--bg)" }} />
      <div id="catalog-section" className="section" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-inner">
          <div className="section-eyebrow">Catalog</div>
          <h2 className="section-title">Ce vei găsi pe platformă</h2>
          <p className="section-sub">8 cursuri la lansare, 12+ în pregătire. Toate în română, toate cu exerciții practice.</p>
          <BentoGrid items={BENTO_ITEMS} />
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="section">
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 540, margin: "0 auto 48px", textAlign: "center" }}
          >
            <div style={{
              display: "inline-flex",
              border: "1px solid #2a2a3e",
              borderRadius: 8,
              padding: "4px 16px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "#a78bfa",
              marginBottom: 16,
            }}>
              Testimoniale
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>Ce spun cei care au aplicat</h2>
            <p style={{ fontSize: 15, color: "#8888a8", lineHeight: 1.65 }}>
              Studenți din România care au trecut de la teorie la rezultate reale.
            </p>
          </motion.div>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            maxHeight: 700,
            overflow: "hidden",
            maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          }}>
            <TestimonialsColumn testimonials={TESTIMONIALS_COLUMNS.slice(0, 3)} duration={18} />
            <TestimonialsColumn
              testimonials={TESTIMONIALS_COLUMNS.slice(3, 6)}
              duration={22}
              className="hidden-mobile"
            />
            <TestimonialsColumn
              testimonials={TESTIMONIALS_COLUMNS.slice(6, 9)}
              duration={20}
              className="hidden-tablet"
            />
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing-section" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <Pricing
          plans={PRICING_PLANS}
          title="Simplu și transparent"
          description="Fără surprize. Acces complet, actualizări incluse."
        />
      </div>

      {/* CTA FINAL */}
      <div className="cta-section">
        <div className="cta-glow" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-eyebrow" style={{ display: "block", marginBottom: 12 }}>Gata să începi?</div>
          <h2 className="section-title" style={{ marginBottom: 12 }}>Fii printre primii 500.</h2>
          <p className="section-sub" style={{ margin: "0 auto 36px" }}>
            Primii 500 de înscriși primesc preț de lansare cu 40% reducere față de prețul public.
          </p>
          <button className="btn-primary-lg" onClick={scrollToForm}>
            Vreau acces anticipat →
          </button>
          <div style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>
            Fără card de credit. Anulezi oricând.
          </div>
        </div>
      </div>
    </>
  );
}

function CatalogPage() {
  const [activeCat, setActiveCat] = useState("Toate");
  const [search, setSearch] = useState("");

  const filtered = COURSES.filter((c) => {
    const matchCat = activeCat === "Toate" || c.cat === activeCat;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="section">
      <div className="section-inner">
        <div className="section-eyebrow">Catalog</div>
        <h2 className="section-title">Toate cursurile</h2>
        <p className="section-sub">
          {COURSES.length} cursuri disponibile la lansare. Filtrează după categorie sau caută direct.
        </p>

        {/* Filters */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 32 }}>
          <input
            className="form-input"
            type="text"
            placeholder="Caută un curs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 280 }}
          />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: "1px solid",
                  borderColor: activeCat === cat ? "var(--accent)" : "var(--border2)",
                  background: activeCat === cat ? "rgba(108,99,255,0.12)" : "var(--bg2)",
                  color: activeCat === cat ? "var(--accent2)" : "var(--muted2)",
                  fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div>Niciun curs găsit. Încearcă altă căutare.</div>
          </div>
        ) : (
          <div className="courses-grid">
            {filtered.map((c) => (
              <div className="course-card" key={c.title}>
                <div className="course-thumb" style={{ background: c.color }}>
                  <span className="course-thumb-emoji">{c.emoji}</span>
                  {c.badge && (
                    <span className={`course-badge ${c.badge === "popular" ? "badge-popular" : "badge-new"}`}>
                      {c.badge === "popular" ? "Popular" : "Nou"}
                    </span>
                  )}
                </div>
                <div className="course-body">
                  <div className="course-cat">{c.cat}</div>
                  <div className="course-title">{c.title}</div>
                  <div className="course-desc">{c.desc}</div>
                  <div className="course-footer">
                    <span className="course-footer-item">📹 {c.lessons} lecții</span>
                    <span className="course-footer-item">⏱ {c.duration}</span>
                    <LevelPill level={c.level} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardPage() {
  const [activeNav, setActiveNav] = useState("overview");

  const sidebarItems = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "courses", icon: "🎓", label: "Cursurile mele" },
    { id: "progress", icon: "📈", label: "Progres" },
    { id: "certificates", icon: "🏆", label: "Certificate" },
    { id: "settings", icon: "⚙️", label: "Setări" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: "var(--bg)" }}>
      {/* SIDEBAR */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: "#0d0d12",
        borderRight: "1px solid rgba(108,99,255,0.15)",
        padding: "24px 0",
        display: "flex", flexDirection: "column", gap: 2,
      }}>
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 20px",
              background: activeNav === item.id ? "rgba(108,99,255,0.12)" : "none",
              borderLeft: activeNav === item.id ? "2px solid #6c63ff" : "2px solid transparent",
              border: "none",
              borderLeftStyle: "solid",
              color: activeNav === item.id ? "#c4b5fd" : "rgba(255,255,255,0.4)",
              fontSize: 14, fontWeight: activeNav === item.id ? 600 : 400,
              cursor: "pointer", fontFamily: "inherit",
              textAlign: "left", width: "100%",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              if (activeNav !== item.id) {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== item.id) {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)";
                (e.currentTarget as HTMLButtonElement).style.background = "none";
              }
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        <div style={{ marginTop: "auto", padding: "16px 20px", borderTop: "1px solid rgba(108,99,255,0.12)" }}>
          <div style={{
            position: "relative", overflow: "hidden",
            background: "#111020",
            border: "1px solid rgba(108,99,255,0.3)",
            borderRadius: 12, padding: "14px",
            boxShadow: "0 0 20px rgba(108,99,255,0.08)",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle at center, rgba(108,99,255,0.07) 1px, transparent 1px)",
              backgroundSize: "16px 16px", pointerEvents: "none",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#a78bfa", marginBottom: 6 }}>
                DEMO CONT
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, marginBottom: 10 }}>
                Înscrie-te pe waitlist pentru acces real.
              </div>
              <button className="btn-accent" style={{ width: "100%", fontSize: 12, padding: "8px 12px", borderRadius: 8 }}>
                Înscrie-te →
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "32px 40px", overflowY: "auto", background: "var(--bg)" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5, marginBottom: 4, color: "#fff" }}>
            Bun venit înapoi, Alex! 👋
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
            Continuă de unde ai rămas. Ai 2 cursuri active.
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12, marginBottom: 40,
        }}>
          {STATS.map((s) => (
            <div key={s.label} style={{
              position: "relative", overflow: "hidden",
              background: "#111020",
              border: "1px solid rgba(108,99,255,0.3)",
              borderRadius: 14, padding: "20px 22px",
              boxShadow: "0 0 24px rgba(108,99,255,0.08)",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(circle at center, rgba(108,99,255,0.06) 1px, transparent 1px)",
                backgroundSize: "18px 18px", pointerEvents: "none",
              }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: -1, color: "#fff" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Enrolled courses */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#fff" }}>Continuă să înveți</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ENROLLED.map((c) => (
              <div key={c.title} style={{
                position: "relative", overflow: "hidden",
                background: "#111020",
                border: "1px solid rgba(108,99,255,0.3)",
                borderRadius: 14, padding: "20px 22px",
                display: "flex", alignItems: "center", gap: 16,
                boxShadow: "0 0 24px rgba(108,99,255,0.08)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(108,99,255,0.5)";
                el.style.boxShadow = "0 0 32px rgba(108,99,255,0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(108,99,255,0.3)";
                el.style.boxShadow = "0 0 24px rgba(108,99,255,0.08)";
              }}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "radial-gradient(circle at center, rgba(108,99,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "18px 18px", pointerEvents: "none",
                }} />
                <div style={{
                  position: "relative", zIndex: 1,
                  width: 48, height: 48, borderRadius: 10,
                  background: "rgba(108,99,255,0.12)",
                  border: "1px solid rgba(108,99,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, flexShrink: 0,
                }}>
                  {c.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#fff" }}>
                    {c.title}
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 100, height: 6, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 100,
                      width: `${c.progress}%`,
                      background: "linear-gradient(90deg, #6c63ff, #a78bfa)",
                    }} />
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
                    {c.done} / {c.lessons} lecții completate · {c.progress}%
                  </div>
                </div>
                <button className="btn-accent" style={{ flexShrink: 0, fontSize: 13, padding: "8px 16px", position: "relative", zIndex: 1 }}>
                  Continuă →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recomandate */}
        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#fff" }}>Recomandate pentru tine</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {COURSES.slice(2, 5).map((c) => (
              <div className="course-card" key={c.title} style={{ cursor: "default" }}>
                <div className="course-thumb" style={{ background: c.color }}>
                  <span className="course-thumb-emoji">{c.emoji}</span>
                  {c.badge && (
                    <span className={`course-badge ${c.badge === "popular" ? "badge-popular" : "badge-new"}`}>
                      {c.badge === "popular" ? "Popular" : "Nou"}
                    </span>
                  )}
                </div>
                <div className="course-body">
                  <div className="course-cat">{c.cat}</div>
                  <div className="course-title">{c.title}</div>
                  <div className="course-desc">{c.desc}</div>
                  <div className="course-footer">
                    <span className="course-footer-item">📹 {c.lessons} lecții</span>
                    <LevelPill level={c.level} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

// Offset added to the real Supabase count to show a more social-proof number
const COUNT_OFFSET = 684;

export default function App() {
  const [page, setPage] = useState<"home" | "catalog" | "dashboard">("home");
  const [count, setCount] = useState<number>(COUNT_OFFSET);
  const formRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    fetch("/api/waitlist-count")
      .then((r) => r.json())
      .then((d) => setCount((d.count ?? 0) + COUNT_OFFSET))
      .catch(() => setCount(COUNT_OFFSET));
  }, []);

  function scrollToForm() {
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <>
      <Header page={page} setPage={setPage} scrollToForm={scrollToForm} />

      {page === "home" && <HomePage count={count} formRef={formRef} scrollToForm={scrollToForm} />}
      {page === "catalog" && <CatalogPage />}
      {page === "dashboard" && <DashboardPage />}

      {/* FOOTER (always visible) */}
      {page !== "dashboard" && (
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-bottom" style={{ paddingTop: 0, borderTop: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img src="/logo.png" alt="Edu-AI" style={{ height: 24, width: "auto", opacity: 0.35, filter: "grayscale(1)" }} />
              </div>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>© 2026 Edu-AI</span>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
