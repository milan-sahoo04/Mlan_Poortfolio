import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee({ bg = "#39FF14", color = "#000" }) {
  const trackRef = useRef(null);
  const directionRef = useRef(-1);
  const speedRef = useRef(1);
  const xRef = useRef(0);
  const rafRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    const itemW = el.scrollWidth / 2;

    const tick = () => {
      speedRef.current += (1 - speedRef.current) * 0.06;
      xRef.current += directionRef.current * speedRef.current * 1.2;

      if (xRef.current <= -itemW) xRef.current += itemW;
      if (xRef.current >= 0) xRef.current -= itemW;

      el.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
      if (delta > 0) directionRef.current = -1;
      else if (delta < 0) directionRef.current = 1;
      speedRef.current = Math.min(speedRef.current + Math.abs(delta) * 0.12, 7);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    speedRef.current = 0.15;
  };
  const handleMouseLeave = () => {
    speedRef.current = 1;
  };

  const items = Array(10).fill(null);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: bg,
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "22px 0",
        position: "relative",
        zIndex: 100,
        cursor: "none",
      }}
    >
      <div
        ref={trackRef}
        style={{ display: "inline-flex", willChange: "transform" }}
      >
        {items.map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontSize: "clamp(3rem, 5.5vw, 5rem)",
              letterSpacing: "0.06em",
              color,
              paddingRight: "48px",
              display: "inline-flex",
              alignItems: "center",
              gap: "24px",
              lineHeight: 1,
            }}
          >
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <rect x="7" y="7" width="10" height="10" rx="1" />
              <line x1="9" y1="7" x2="9" y2="4" />
              <line x1="12" y1="7" x2="12" y2="4" />
              <line x1="15" y1="7" x2="15" y2="4" />
              <line x1="9" y1="17" x2="9" y2="20" />
              <line x1="12" y1="17" x2="12" y2="20" />
              <line x1="15" y1="17" x2="15" y2="20" />
              <line x1="7" y1="9" x2="4" y2="9" />
              <line x1="7" y1="12" x2="4" y2="12" />
              <line x1="7" y1="15" x2="4" y2="15" />
              <line x1="17" y1="9" x2="20" y2="9" />
              <line x1="17" y1="12" x2="20" y2="12" />
              <line x1="17" y1="15" x2="20" y2="15" />
              <rect x="10" y="10" width="4" height="4" rx="0.5" fill={color} />
            </svg>
            FULLSTACK DEVELOPER
            <span style={{ opacity: 0.4, fontSize: "2rem", margin: "0 4px" }}>
              ✦
            </span>
            SOFTWARE ENGINEER
          </span>
        ))}
      </div>
    </div>
  );
}
