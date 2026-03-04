"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(13, 13, 18)",
  gradientBackgroundEnd = "rgb(20, 10, 40)",
  firstColor = "108, 99, 255",
  secondColor = "167, 139, 250",
  thirdColor = "100, 180, 255",
  fourthColor = "80, 50, 180",
  fifthColor = "140, 80, 255",
  pointerColor = "108, 99, 255",
  size = "70%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className={cn(
        "h-full w-full relative",
        !containerClassName && "overflow-hidden",
        containerClassName
      )}
      style={{
        background: `linear-gradient(40deg, var(--gradient-background-start), var(--gradient-background-end))`,
      }}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={cn("relative z-10", className)}>{children}</div>

      <div
        className={cn(
          "absolute inset-0 w-full h-full blur-lg",
          isSafari ? "blur-2xl" : ""
        )}
        style={isSafari ? {} : { filter: "url(#blurMe) blur(40px)" }}
      >
        {/* First */}
        <div
          className="grad-first"
          style={{
            position: "absolute",
            background: `radial-gradient(circle at center, rgba(var(--first-color), 1) 0, rgba(var(--first-color), 0) 50%) no-repeat`,
            mixBlendMode: blendingValue as React.CSSProperties["mixBlendMode"],
            width: "var(--size)",
            height: "var(--size)",
            top: "calc(50% - var(--size) / 2)",
            left: "calc(50% - var(--size) / 2)",
            transformOrigin: "center center",
            animation: "moveVertical 30s ease infinite",
            opacity: 1,
          }}
        />
        {/* Second */}
        <div
          style={{
            position: "absolute",
            background: `radial-gradient(circle at center, rgba(var(--second-color), 0.8) 0, rgba(var(--second-color), 0) 50%) no-repeat`,
            mixBlendMode: blendingValue as React.CSSProperties["mixBlendMode"],
            width: "var(--size)",
            height: "var(--size)",
            top: "calc(50% - var(--size) / 2)",
            left: "calc(50% - var(--size) / 2)",
            transformOrigin: "calc(50% - 400px)",
            animation: "moveInCircle 20s reverse infinite",
            opacity: 1,
          }}
        />
        {/* Third */}
        <div
          style={{
            position: "absolute",
            background: `radial-gradient(circle at center, rgba(var(--third-color), 0.8) 0, rgba(var(--third-color), 0) 50%) no-repeat`,
            mixBlendMode: blendingValue as React.CSSProperties["mixBlendMode"],
            width: "var(--size)",
            height: "var(--size)",
            top: "calc(50% - var(--size) / 2)",
            left: "calc(50% - var(--size) / 2)",
            transformOrigin: "calc(50% + 400px)",
            animation: "moveInCircle 40s linear infinite",
            opacity: 1,
          }}
        />
        {/* Fourth */}
        <div
          style={{
            position: "absolute",
            background: `radial-gradient(circle at center, rgba(var(--fourth-color), 0.8) 0, rgba(var(--fourth-color), 0) 50%) no-repeat`,
            mixBlendMode: blendingValue as React.CSSProperties["mixBlendMode"],
            width: "var(--size)",
            height: "var(--size)",
            top: "calc(50% - var(--size) / 2)",
            left: "calc(50% - var(--size) / 2)",
            transformOrigin: "calc(50% - 200px)",
            animation: "moveHorizontal 40s ease infinite",
            opacity: 0.7,
          }}
        />
        {/* Fifth */}
        <div
          style={{
            position: "absolute",
            background: `radial-gradient(circle at center, rgba(var(--fifth-color), 0.8) 0, rgba(var(--fifth-color), 0) 50%) no-repeat`,
            mixBlendMode: blendingValue as React.CSSProperties["mixBlendMode"],
            width: "var(--size)",
            height: "var(--size)",
            top: "calc(50% - var(--size) / 2)",
            left: "calc(50% - var(--size) / 2)",
            transformOrigin: "calc(50% - 800px) calc(50% + 800px)",
            animation: "moveInCircle 20s ease infinite",
            opacity: 1,
          }}
        />
        {/* Interactive pointer */}
        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            style={{
              position: "absolute",
              background: `radial-gradient(circle at center, rgba(var(--pointer-color), 0.8) 0, rgba(var(--pointer-color), 0) 50%) no-repeat`,
              mixBlendMode: blendingValue as React.CSSProperties["mixBlendMode"],
              width: "100%",
              height: "100%",
              top: "-50%",
              left: "-50%",
              opacity: 0.7,
            }}
          />
        )}
      </div>
    </div>
  );
};
