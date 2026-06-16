import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroRing from "../components/HeroRing";

export default function Hero() {
  const nameRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const btnRef = useRef(null);
  const pRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = [
      nameRef.current,
      h1Ref.current,
      h2Ref.current,
      btnRef.current,
      pRef.current,
    ].filter(Boolean);

    gsap.set(els, { y: 60, opacity: 0 });

    const id = setTimeout(() => {
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.11,
        ease: "power3.out",
        overwrite: true,
        onComplete: () => gsap.set(els, { clearProps: "all" }),
      });
    }, 50);

    return () => {
      clearTimeout(id);
      gsap.set(els, { clearProps: "all" });
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="hero-section">
      {/* Blue glow blob */}
      <div className="hero-blob" />

      {/* TEXT */}
      <div className="hero-text">
        <p ref={nameRef} className="hero-name">
          milan sahoo
        </p>

        <h1 ref={h1Ref} className="hero-h1">
          FullStack Developer
        </h1>

        <h1 ref={h2Ref} className="hero-h2">
          &amp; Designer
        </h1>

        <button
          ref={btnRef}
          className="hero-btn"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 24px #ffffff44";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="2.5"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#000" />
          </svg>
          Connect
        </button>

        <p ref={pRef} className="hero-desc">
          I thrive on solving real-world problems, turning ideas into clean,
          maintainable code, and learning through experimentation. You'll find
          me building side projects, diving into new tech stacks, or simply
          exploring what's next in the world of web development.
        </p>
      </div>

      {/* 3D RING — sits in normal flow on mobile, absolute on desktop */}
      <div className="hero-ring-wrap">
        <HeroRing />
      </div>

      {/* Glow behind ring */}
      <div className="hero-ring-glow" />

      <style>{`
        /* ─── SECTION ─────────────────────────────────── */
        .hero-section {
          min-height: 100vh;
          background: #000;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 80px clamp(20px, 5vw, 80px) 60px;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          gap: 40px;
        }

        /* ─── BLOB ─────────────────────────────────────── */
        .hero-blob {
          position: absolute;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, #1a1aff55 0%, transparent 68%);
          border-radius: 50%;
          top: 8%;
          left: -4%;
          pointer-events: none;
        }

        /* ─── TEXT BLOCK ───────────────────────────────── */
        .hero-text {
          max-width: 600px;
          z-index: 1;
          position: relative;
          width: 100%;
          flex-shrink: 0;
        }

        /* ─── NAME ─────────────────────────────────────── */
        .hero-name {
          font-family: 'Dancing Script', cursive !important;
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          border-bottom: 1px solid #ffffff99;
          padding-bottom: 5px;
          margin-bottom: 14px;
          display: inline-block;
          margin-top: 0;
        }

        /* ─── HEADINGS ─────────────────────────────────── */
        .hero-h1 {
          font-family: 'Inter', sans-serif !important;
          font-size: clamp(2.4rem, 6vw, 5.2rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .hero-h2 {
          font-family: 'Inter', sans-serif !important;
          font-size: clamp(2.4rem, 6vw, 5.2rem);
          font-weight: 300;
          color: #ffffff44;
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin-top: 0;
          margin-bottom: clamp(24px, 4vw, 36px);
        }

        /* ─── BUTTON ───────────────────────────────────── */
        .hero-btn {
          background: #fff;
          color: #000;
          border: none;
          border-radius: 999px;
          padding: 13px 30px;
          font-size: 0.9rem;
          font-family: 'Inter', sans-serif !important;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          margin-bottom: 22px;
          transition: transform 0.2s, box-shadow 0.2s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        /* ─── DESC ─────────────────────────────────────── */
        .hero-desc {
          font-family: 'Inter', sans-serif !important;
          color: #ffffff77;
          font-size: clamp(0.82rem, 1.5vw, 0.9rem);
          line-height: 1.75;
          max-width: 430px;
          margin-top: 0;
        }

        /* ─── RING WRAPPER ─────────────────────────────── */
        .hero-ring-wrap {
          /* Desktop: absolute, anchored bottom-right */
          position: absolute;
          right: 2%;
          bottom: 0;
          width: 500px;
          height: 500px;
          flex-shrink: 0;
          z-index: 1;
          pointer-events: none;
        }

        /* ─── RING GLOW ────────────────────────────────── */
        .hero-ring-glow {
          position: absolute;
          right: -2%;
          bottom: -5%;
          width: 500px;
          height: 400px;
          background: radial-gradient(ellipse, #4f46e522 0%, transparent 70%);
          pointer-events: none;
        }

        /* ─── TABLET ≤900px ────────────────────────────── */
        @media (max-width: 900px) {
          .hero-section {
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            padding-top: 110px !important;
            gap: 0 !important;
          }
          .hero-text {
            max-width: 100% !important;
          }
          /* Ring: back into normal flow, centred below text */
          .hero-ring-wrap {
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            width: min(340px, 75vw) !important;
            height: min(340px, 75vw) !important;
            align-self: center;
            margin-top: 32px;
          }
          .hero-ring-glow {
            display: none;
          }
        }

        /* ─── MOBILE ≤600px ────────────────────────────── */
        @media (max-width: 600px) {
          .hero-section {
            padding-top: 96px !important;
            padding-bottom: 48px !important;
          }
          .hero-ring-wrap {
            width: min(260px, 78vw) !important;
            height: min(260px, 78vw) !important;
            margin-top: 20px;
          }
        }

        /* ─── SMALL MOBILE ≤390px ──────────────────────── */
        @media (max-width: 390px) {
          .hero-ring-wrap {
            width: min(220px, 84vw) !important;
            height: min(220px, 84vw) !important;
          }
        }
      `}</style>
    </section>
  );
}
