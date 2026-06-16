import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BANNER_TEXT = ["HIRE ME", "/>", "GET IN TOUCH", "</>", "CONTACT ME", "✦"];

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// ─────────────────────────────────────────────────────────────────────────────
// DiagonalBanner
// Strategy: position each band at left:50%, translateX(-50%) so its centre
// aligns with the viewport centre, then rotate. Width = 200vw so it always
// bleeds past both edges regardless of viewport size.
// ─────────────────────────────────────────────────────────────────────────────
function DiagonalBanner({ direction = 1, topOffset }) {
  const trackRef = useRef(null);
  const dirRef = useRef(direction);
  const xRef = useRef(0);
  const speedRef = useRef(1);
  const rafRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    const itemW = el.scrollWidth / 2;
    if (direction === -1) xRef.current = -itemW;

    const tick = () => {
      speedRef.current += (1 - speedRef.current) * 0.05;
      xRef.current += dirRef.current * speedRef.current * 0.8;
      if (xRef.current <= -itemW) xRef.current += itemW;
      if (xRef.current >= 0) xRef.current -= itemW;
      el.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;
      if (delta > 0) dirRef.current = direction === 1 ? -1 : 1;
      else if (delta < 0) dirRef.current = direction === 1 ? 1 : -1;
      speedRef.current = Math.min(speedRef.current + Math.abs(delta) * 0.1, 7);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [direction]);

  const items = Array(30).fill(null);

  return (
    <div
      style={{
        position: "absolute",
        top: topOffset,
        // Centre-anchor + rotate: this is the key fix
        left: "50%",
        width: "200vw",
        transform: `translateX(-50%) rotate(-5deg)`,
        transformOrigin: "center center",
        background: "#C0392B",
        padding: "13px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        zIndex: 1,
        pointerEvents: "none",
        boxShadow: "0 4px 28px #C0392B55",
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
              display: "inline-flex",
              alignItems: "center",
              gap: "20px",
              paddingRight: "40px",
            }}
          >
            {BANNER_TEXT.map((word, j) => (
              <span
                key={j}
                style={{
                  fontFamily: word.includes("/")
                    ? "monospace"
                    : "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.75rem, 1.1vw, 0.95rem)",
                  letterSpacing: "0.15em",
                  color: word === "✦" ? "#ff9999" : "#fff",
                  opacity: word.includes("/") ? 0.65 : 1,
                }}
              >
                {word}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────────────────
export default function CTA() {
  const bubbleRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const blobRef = useRef(null);

  const [size, setSize] = useState(() => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth <= 600) return "mobile";
    if (window.innerWidth <= 900) return "tablet";
    return "desktop";
  });

  useEffect(() => {
    const check = () => {
      if (window.innerWidth <= 600) setSize("mobile");
      else if (window.innerWidth <= 900) setSize("tablet");
      else setSize("desktop");
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isMobile = size === "mobile";
  const isTablet = size === "tablet";

  // Scroll-triggered heading reveal
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    gsap.set(el, { y: 50, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          overwrite: true,
          onComplete: () => gsap.set(el, { clearProps: "all" }),
        }),
    });
    // Blob breathe
    gsap.to(blobRef.current, {
      scale: 1.18,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      st.kill();
      gsap.set(el, { clearProps: "all" });
    };
  }, []);

  // Mouse-follow bubble (desktop only)
  useEffect(() => {
    if (isTouchDevice || !bubbleRef.current) return;
    const section = sectionRef.current;
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      gsap.to(bubbleRef.current, {
        x: e.clientX - rect.left - 50,
        y: e.clientY - rect.top - 50,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onEnter = () =>
      gsap.to(bubbleRef.current, { scale: 1.1, duration: 0.3 });
    const onLeave = () =>
      gsap.to(bubbleRef.current, { scale: 1, duration: 0.3 });
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── Layout values ────────────────────────────────────────────────────────
  // Band height ≈ 40px (13px padding × 2 + ~14px text).
  // We want 3 bands with ~8px gap between them.
  // bannerHeight must be tall enough to contain all 3 bands after rotation.
  const BAND_H = isMobile ? 36 : 42; // px — visual height of one band
  const BAND_GAP = isMobile ? 10 : 14; // px — gap between bands
  const TOTAL = BAND_H * 3 + BAND_GAP * 2; // total stack height
  // Add vertical padding so the rotated ends don't clip
  const VPAD = isMobile ? 24 : 36;
  const bannerHeight = TOTAL + VPAD * 2;

  // Top offsets for the 3 bands (within the banner block)
  const band0 = VPAD;
  const band1 = VPAD + BAND_H + BAND_GAP;
  const band2 = VPAD + (BAND_H + BAND_GAP) * 2;

  // Heading font: 2 lines, never overflows
  const headingSize = isMobile
    ? "clamp(1.6rem, 7.5vw, 2.2rem)"
    : isTablet
      ? "clamp(2rem, 5vw, 2.8rem)"
      : "clamp(2.4rem, 3.6vw, 4rem)";

  const blobSize = isMobile ? "260px" : isTablet ? "380px" : "560px";

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#000",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* ── HEADING ────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
          padding: isMobile
            ? "52px 24px 40px"
            : isTablet
              ? "72px 48px 56px"
              : "90px 60px 70px",
        }}
      >
        {/* Ambient glow blob — centred */}
        <div
          ref={blobRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: blobSize,
            height: blobSize,
            background:
              "radial-gradient(circle, #0044ff55 0%, #001577 35%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <h2
          ref={headingRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            fontSize: headingSize,
            color: "#fff",
            lineHeight: 1.15,
            position: "relative",
            zIndex: 1,
            letterSpacing: "0.03em",
            textShadow: "0 0 80px #0033ff44",
            margin: "0 auto",
            maxWidth: "880px",
            // Force exactly 2 lines with <br/>; don't use pre-line
          }}
        >
          READY TO TAKE YOUR IDEA
          <br />
          TO THE NEXT LEVEL?
        </h2>
      </div>

      {/* ── BANNER BLOCK ───────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: `${bannerHeight}px`,
          overflow: "hidden", // clips rotated band ends
        }}
      >
        {/* Cursor-follow bubble */}
        {!isTouchDevice && (
          <div
            ref={bubbleRef}
            style={{
              position: "absolute",
              width: "100px",
              height: "100px",
              background: "#39FF14",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              fontWeight: 700,
              fontSize: "0.85rem",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 5,
              letterSpacing: "0.03em",
              boxShadow: "0 0 30px #39FF1466",
              gap: "2px",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>↗</span>
            <span>start</span>
          </div>
        )}

        <DiagonalBanner direction={1} topOffset={`${band0}px`} />
        <DiagonalBanner direction={-1} topOffset={`${band1}px`} />
        <DiagonalBanner direction={1} topOffset={`${band2}px`} />
      </div>
    </section>
  );
}
