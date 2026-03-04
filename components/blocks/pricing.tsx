"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    const next = !isMonthly;
    setIsMonthly(prev => !prev);
    if (next === false && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ["#6c63ff", "#a78bfa", "#818cf8"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 40px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 style={{
          fontSize: "clamp(28px, 3.5vw, 44px)",
          fontWeight: 800,
          letterSpacing: "-1px",
          color: "#fff",
          marginBottom: 12,
        }}>
          {title}
        </h2>
        <p style={{ fontSize: 16, color: "#8888a8", lineHeight: 1.65 }}>
          {description}
        </p>
      </div>

      {/* Toggle */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 48 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: isMonthly ? "#fff" : "#8888a8", transition: "color 0.2s" }}>
          Lunar
        </span>
        <button
          ref={switchRef}
          onClick={handleToggle}
          style={{
            position: "relative",
            width: 44,
            height: 24,
            borderRadius: 100,
            border: "none",
            cursor: "pointer",
            background: isMonthly ? "#2a2a3e" : "#6c63ff",
            transition: "background 0.25s ease",
            flexShrink: 0,
          }}
          aria-label="Toggle billing period"
        >
          <span style={{
            position: "absolute",
            top: 2,
            left: isMonthly ? 2 : 22,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.25s ease",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
          }} />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: isMonthly ? "#8888a8" : "#fff", transition: "color 0.2s" }}>
          Anual{" "}
          <span style={{ color: "#6c63ff" }}>(Economisești 20%)</span>
        </span>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 20,
        alignItems: "center",
      }}>
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 1 }}
            animate={
              isDesktop
                ? {
                    y: plan.isPopular ? -16 : 0,
                    scale: plan.isPopular ? 1.03 : 0.96,
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 120,
              damping: 20,
              delay: index * 0.08,
            }}
            style={{
              position: "relative",
              borderRadius: 16,
              padding: 32,
              background: plan.isPopular ? "#1a1a24" : "#13131a",
              border: plan.isPopular ? "2px solid #6c63ff" : "1px solid #1f1f2e",
              boxShadow: plan.isPopular ? "0 0 40px rgba(108,99,255,0.15)" : "none",
              display: "flex",
              flexDirection: "column",
              zIndex: plan.isPopular ? 10 : 0,
            }}
          >
            {/* Popular badge */}
            {plan.isPopular && (
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                padding: "4px 14px",
                borderRadius: "0 14px 0 12px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}>
                <Star size={12} fill="#fff" color="#fff" />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Popular</span>
              </div>
            )}

            {/* Plan name */}
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: plan.isPopular ? "#a78bfa" : "#8888a8",
              marginBottom: 16,
            }}>
              {plan.name}
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-2px", color: "#fff" }}>
                <NumberFlow
                  value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
                  transformTiming={{ duration: 450, easing: "ease-out" }}
                  willChange
                />
              </span>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#8888a8" }}>RON</span>
            </div>
            <div style={{ fontSize: 13, color: "#8888a8", marginBottom: 6 }}>
              {plan.period !== "o singură dată" ? `/ ${plan.period}` : plan.period}
            </div>
            {plan.period !== "o singură dată" && (
              <div style={{ fontSize: 12, color: "#8888a8", marginBottom: 20 }}>
                {isMonthly ? "facturat lunar" : "facturat anual"}
              </div>
            )}
            {plan.period === "o singură dată" && (
              <div style={{ marginBottom: 20 }} />
            )}

            {/* Description */}
            <div style={{ fontSize: 14, color: "#b0b0c8", marginBottom: 24, lineHeight: 1.55 }}>
              {plan.description}
            </div>

            {/* Separator */}
            <div style={{ height: 1, background: "#1f1f2e", marginBottom: 20 }} />

            {/* Features */}
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
              {plan.features.map((feature, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Check size={15} color={plan.isPopular ? "#a78bfa" : "#6c63ff"} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 14, color: "#b0b0c8" }}>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href={plan.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "13px 20px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.2s ease",
                background: plan.isPopular
                  ? "linear-gradient(135deg, #6c63ff, #a78bfa)"
                  : "transparent",
                color: plan.isPopular ? "#fff" : "#b0b0c8",
                border: plan.isPopular ? "none" : "1px solid #2a2a3e",
                boxShadow: plan.isPopular ? "0 8px 24px rgba(108,99,255,0.3)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!plan.isPopular) {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#6c63ff";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#a78bfa";
                } else {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(108,99,255,0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.isPopular) {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a2a3e";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#b0b0c8";
                } else {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(108,99,255,0.3)";
                }
              }}
            >
              {plan.buttonText}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
