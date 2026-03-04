"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className} style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ display: "flex", flexDirection: "column", gap: 20, paddingBottom: 20 }}
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                style={{
                  padding: "24px 28px",
                  borderRadius: 20,
                  border: "1px solid #1f1f2e",
                  background: "#13131a",
                  boxShadow: "0 4px 24px rgba(108,99,255,0.07)",
                  maxWidth: 300,
                  width: "100%",
                }}
              >
                <p style={{ fontSize: 14, color: "#b0b0c8", lineHeight: 1.65, marginBottom: 20 }}>
                  &ldquo;{text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>{name}</div>
                    <div style={{ fontSize: 13, color: "#8888a8", lineHeight: 1.3 }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
