import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Plan & Architect",
    desc: "Before writing a single line of code, I dive deep into understanding the project goals, user needs, and technical constraints.",
  },
  {
    n: "02",
    title: "Build & Develop",
    desc: "Build pixel-perfect user interfaces. I ensure that every component—UI or API—is maintainable.",
  },
  {
    n: "03",
    title: "Launch & Support",
    desc: "I also provide post-launch monitoring, performance optimization, and ongoing iteration support to keep your product growing.",
  },
];

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export default function WorkProcess() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".step", gridRef.current);

      gsap.set(cards, { opacity: 0, y: 50 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.22,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = (e) => {
    if (isTouchDevice) return;
    const card = e.currentTarget;
    card.style.background = "linear-gradient(135deg, #0a0a0a 0%, #0d1230 100%)";
    card.style.boxShadow =
      "-10px 24px 50px -10px #00000099, 0 0 40px #39FF1422";
    card.style.zIndex = 5;
    const inner = card.querySelector(".step-inner");
    if (inner)
      inner.style.transform =
        "translate(10px, -14px) scale(1.035) rotate(-1deg)";
    const num = card.querySelector(".step-num");
    if (num) {
      num.style.color = "#7CFF5C";
      num.style.textShadow = "0 0 36px #39FF1466";
    }
    const title = card.querySelector(".step-title");
    if (title) title.style.transform = "translateX(6px)";
    const desc = card.querySelector(".step-desc");
    if (desc) desc.style.color = "#ffffffb0";
    const sweep = card.querySelector(".diag-sweep");
    if (sweep) {
      sweep.style.opacity = "1";
      sweep.style.transform = "translate(40%, -40%)";
    }
  };

  const handleLeave = (e) => {
    if (isTouchDevice) return;
    const card = e.currentTarget;
    card.style.background = "transparent";
    card.style.boxShadow = "none";
    card.style.zIndex = 1;
    const inner = card.querySelector(".step-inner");
    if (inner) inner.style.transform = "translate(0,0) scale(1) rotate(0deg)";
    const num = card.querySelector(".step-num");
    if (num) {
      num.style.color = "#39FF14";
      num.style.textShadow = "none";
    }
    const title = card.querySelector(".step-title");
    if (title) title.style.transform = "translateX(0)";
    const desc = card.querySelector(".step-desc");
    if (desc) desc.style.color = "#ffffff70";
    const sweep = card.querySelector(".diag-sweep");
    if (sweep) {
      sweep.style.opacity = "0";
      sweep.style.transform = "translate(0%, 0%)";
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(135deg, #000 60%, #0a0a2a 100%)",
        padding: "80px 0 0 0",
        borderTop: "1px solid #ffffff11",
        position: "relative",
      }}
    >
      {/* Dark blue glow top-right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "520px",
          height: "340px",
          background:
            "radial-gradient(ellipse at top right, #0d1a4a 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Heading */}
      <h2
        className="workprocess-heading"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.6rem, 4.5vw, 3.2rem)",
          color: "#fff",
          textAlign: "right",
          marginBottom: "48px",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
          position: "relative",
          zIndex: 1,
          padding: "0 clamp(16px, 5vw, 60px)",
        }}
      >
        MY WORK DEVELOPMENT
        <br />
        WORK PROCESS
      </h2>

      {/* Steps grid */}
      <div
        ref={gridRef}
        className="workprocess-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: "1px solid #ffffff18",
          position: "relative",
          zIndex: 1,
        }}
      >
        {steps.map((s, i) => (
          <div
            key={i}
            className="step"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{
              padding: "48px 40px 56px 40px",
              borderRight: i < 2 ? "1px solid #ffffff18" : "none",
              position: "relative",
              overflow: "hidden",
              cursor: isTouchDevice ? "default" : "none",
              transition:
                "background 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease",
            }}
          >
            {/* Diagonal light sweep */}
            <div
              className="diag-sweep"
              style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "120%",
                height: "120%",
                background:
                  "linear-gradient(135deg, transparent 40%, #39FF1414 50%, transparent 60%)",
                opacity: 0,
                transition:
                  "opacity 0.45s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            <div
              className="step-inner"
              style={{
                position: "relative",
                zIndex: 1,
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <p
                className="step-num"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(3.5rem, 8vw, 10rem)",
                  color: "#39FF14",
                  lineHeight: 0.9,
                  marginLeft: "-4px",
                  marginBottom: "24px",
                  letterSpacing: "-0.02em",
                  transition: "color 0.4s ease, text-shadow 0.4s ease",
                }}
              >
                {s.n}
              </p>

              <h3
                className="step-title"
                style={{
                  color: "#39FF14",
                  fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                  fontWeight: 700,
                  marginBottom: "12px",
                  letterSpacing: "0.01em",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {s.title}
              </h3>

              <p
                className="step-desc"
                style={{
                  color: "#ffffff70",
                  fontSize: "clamp(0.78rem, 1.5vw, 0.88rem)",
                  lineHeight: 1.75,
                  maxWidth: "320px",
                  transition: "color 0.4s ease",
                }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* ── Tablet: 2+1 layout ── */
        @media (max-width: 900px) {
          .workprocess-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .workprocess-grid .step:nth-child(2) {
            border-right: none !important;
          }
          .workprocess-grid .step:nth-child(3) {
            grid-column: span 2;
            border-right: none !important;
            border-top: 1px solid #ffffff18;
          }
          .workprocess-grid .step {
            padding: 36px 28px 44px !important;
          }
        }

        /* ── Mobile: 1 column ── */
        @media (max-width: 600px) {
          .workprocess-heading {
            text-align: left !important;
          }
          .workprocess-grid {
            grid-template-columns: 1fr !important;
          }
          .workprocess-grid .step {
            border-right: none !important;
            border-top: 1px solid #ffffff18;
            padding: 28px 20px 36px !important;
          }
          .workprocess-grid .step:nth-child(3) {
            grid-column: span 1 !important;
          }
        }

        /* ── Mobile small (≤390px) ── */
        @media (max-width: 390px) {
          .workprocess-grid .step {
            padding: 22px 16px 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
