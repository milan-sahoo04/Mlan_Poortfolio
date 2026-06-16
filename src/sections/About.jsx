import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: "React js",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1.2"
          fill="none"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1.2"
          fill="none"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          stroke="#61DAFB"
          strokeWidth="1.2"
          fill="none"
          transform="rotate(120 12 12)"
        />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path
          d="M12 2L2 7v10l10 5 10-5V7L12 2z"
          fill="#539E43"
          opacity="0.15"
        />
        <path
          d="M12 2L2 7v10l10 5 10-5V7L12 2z"
          stroke="#539E43"
          strokeWidth="1.5"
          fill="none"
        />
        <text x="6.5" y="15.5" fontSize="6.5" fill="#539E43" fontWeight="bold">
          JS
        </text>
      </svg>
    ),
  },
  {
    name: "Express.js",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <rect
          x="2"
          y="9"
          width="20"
          height="6"
          rx="3"
          stroke="#ffffff"
          strokeWidth="1.3"
        />
        <text x="5.2" y="13.6" fontSize="6" fill="#ffffff" fontWeight="bold">
          Ex
        </text>
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path
          d="M12 2C12 2 7 8.5 7 13a5 5 0 0010 0c0-4.5-5-11-5-11z"
          fill="#4DB33D"
        />
        <path
          d="M12 20v2"
          stroke="#4DB33D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "MySQL",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path
          d="M4 16c0-5 3-9 8-9s8 4 8 9"
          stroke="#00758F"
          strokeWidth="1.4"
          fill="none"
        />
        <circle cx="18" cy="6" r="1.4" fill="#F29111" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path
          d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.667 1.715 1.215C13.245 10.383 14.28 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.667-1.715-1.215C15.255 7.017 14.22 6 12 6zM7.5 11.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.667 1.715 1.215C8.745 15.783 9.78 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.667-1.715-1.215C10.755 12.417 9.72 11.4 7.5 11.4z"
          fill="#38BDF8"
        />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
        <text x="6" y="16.5" fontSize="9" fill="#fff" fontWeight="bold">
          TS
        </text>
      </svg>
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
        <text x="5" y="16.5" fontSize="8" fill="#000" fontWeight="bold">
          JS
        </text>
      </svg>
    ),
  },
  {
    name: "HTML5",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path d="M3 2h18l-1.6 18L12 22 4.6 20 3 2z" fill="#E34F26" />
        <path d="M12 4v16.5l6-1.6L19.2 4H12z" fill="#EF652A" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path d="M3 2h18l-1.6 18L12 22 4.6 20 3 2z" fill="#1572B6" />
        <path d="M12 4v16.5l6-1.6L19.2 4H12z" fill="#33A9DC" />
      </svg>
    ),
  },
  {
    name: "Bootstrap",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#7952B3" />
        <text x="7.5" y="16.5" fontSize="9" fill="#fff" fontWeight="bold">
          B
        </text>
      </svg>
    ),
  },
  {
    name: "OOP / Java",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path
          d="M8 17c-1 1.5 1 2.5 4 2.5s5-1 4-2.5"
          stroke="#f89820"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M9 3c-2 2 3 3 1 5"
          stroke="#f89820"
          strokeWidth="1.2"
          fill="none"
        />
        <ellipse
          cx="12"
          cy="13.5"
          rx="6"
          ry="2.4"
          stroke="#5382a1"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    ),
  },
];

const tools = [
  {
    name: "VS Code",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path
          d="M17 2.5L7.5 11 3 8l-1.5 1L6 12l-4.5 3 1.5 1 4.5-3 9.5 8.5L22 19.5v-15L17 2.5z"
          fill="#007ACC"
        />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#ffffff">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Git",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path
          d="M21.6 11l-9-9a1.4 1.4 0 00-2 0l-2 2 2.5 2.5a1.7 1.7 0 012.1 2.1l2.4 2.4a1.7 1.7 0 11-1 1l-2.3-2.3v6a1.7 1.7 0 11-1.4 0V9.4a1.7 1.7 0 01-.9-2.2L7.4 4.6 2.4 9.6a1.4 1.4 0 000 2l9 9a1.4 1.4 0 002 0l8.2-8.2a1.4 1.4 0 000-2z"
          fill="#F05033"
        />
      </svg>
    ),
  },
  {
    name: "IntelliJ IDEA",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="3"
          fill="#000"
          stroke="#fc5"
          strokeWidth="0.5"
        />
        <rect x="2" y="2" width="20" height="5" fill="#fc5" />
        <rect x="2" y="17" width="20" height="5" fill="#f97" />
        <text x="6.5" y="14" fontSize="6" fill="#fff" fontWeight="bold">
          IJ
        </text>
      </svg>
    ),
  },
  {
    name: "Firebase",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path d="M5 19L8 2l4 7.5-3.2 1.8L5 19z" fill="#FFA000" />
        <path d="M5 19l3-17 9 17H5z" fill="#FFCA28" opacity="0.9" />
        <path d="M5 19l9-17 5 11.5L5 19z" fill="#F57C00" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
        <path d="M12 22L4 12h6V2l8 10h-6v10z" fill="#3ECF8E" />
      </svg>
    ),
  },
];

// Reusable icon grid card
function IconCard({ item, glowColor }) {
  return (
    <div
      key={item.name}
      className={`${glowColor === "green" ? "skill-card" : "tool-card"}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "9px",
        width: "72px",
      }}
    >
      <div
        style={{
          width: "54px",
          height: "54px",
          background: "#0d0d0d",
          border: "1px solid #ffffff1a",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor =
            glowColor === "green" ? "#39FF1466" : "#6366f166";
          e.currentTarget.style.boxShadow =
            glowColor === "green" ? "0 0 18px #39FF1433" : "0 0 18px #6366f144";
          e.currentTarget.style.transform = "translateY(-5px) scale(1.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#ffffff1a";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0) scale(1)";
        }}
      >
        {item.icon}
      </div>
      <span
        style={{
          color: "#ffffffbb",
          fontSize: "0.68rem",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {item.name}
      </span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const photoCardRef = useRef(null);
  const nameRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoCardRef.current,
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: photoCardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      const textReveals = gsap.utils.toArray(
        ".reveal-text",
        sectionRef.current,
      );
      gsap.fromTo(
        textReveals,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.16,
          ease: "power3.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      const skillCards = gsap.utils.toArray(".skill-card", sectionRef.current);
      gsap.fromTo(
        skillCards,
        { y: 45, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".skills-grid"),
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      const toolCards = gsap.utils.toArray(".tool-card", sectionRef.current);
      gsap.fromTo(
        toolCards,
        { y: 45, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".tools-grid"),
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "linear-gradient(135deg, #000 40%, #050018 100%)",
        padding: isMobile
          ? "80px 20px 60px"
          : "100px clamp(30px, 5vw, 80px) 80px",
        display: "grid",
        // ✅ Single column on mobile, two columns on desktop
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.15fr",
        gap: isMobile ? "40px" : "60px",
        alignItems: "start",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Ambient glow top right */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "10%",
          width: isMobile ? "220px" : "420px",
          height: isMobile ? "220px" : "420px",
          background: "radial-gradient(circle, #4f46e555 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── LEFT: Photo card ── */}
      <div ref={photoCardRef} style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 40% 65%, #1a1aff55, transparent 65%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            background: "#0d0d1a",
            borderRadius: "16px",
            // ✅ Auto height on mobile so image isn't clipped
            height: isMobile ? "auto" : "560px",
            maxHeight: isMobile ? "420px" : "none",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
            border: "1px solid #ffffff0a",
            transition:
              "transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.015)";
              e.currentTarget.style.boxShadow = "0 20px 60px -10px #1a1aff66";
              e.currentTarget.style.borderColor = "#39FF1433";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#ffffff0a";
            }
          }}
        >
          <img
            src="/src/assets/myphoto1.avif"
            alt="Milan Sahoo"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              // ✅ On mobile set a proper aspect ratio so image shows fully
              aspectRatio: isMobile ? "3 / 4" : "auto",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 40%, #00000099 100%)",
            }}
          />
          <p
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              fontFamily: "Bebas Neue, sans-serif",
              // ✅ Smaller label font on mobile
              fontSize: isMobile ? "2.2rem" : "3.2rem",
              color: "#39FF14",
              lineHeight: 1,
              letterSpacing: "0.04em",
              zIndex: 2,
              textShadow: "0 0 24px #39ff1455",
            }}
          >
            FullStack
            <br />
            Developer
          </p>
        </div>
      </div>

      {/* ── RIGHT: Bio ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Hello label */}
        <p
          className="reveal-text"
          style={{
            color: "#ffffff55",
            fontSize: "0.75rem",
            letterSpacing: "0.22em",
            marginBottom: "4px",
            textTransform: "uppercase",
          }}
        >
          HELLO IM
        </p>

        {/* Name */}
        <h2
          ref={nameRef}
          className="reveal-text"
          style={{
            color: "#39FF14",
            fontSize: isMobile ? "1.7rem" : "2.1rem",
            fontWeight: 700,
            marginBottom: "26px",
            fontFamily: "Inter, sans-serif",
            textShadow: "0 0 30px #39ff1433",
            display: "inline-block",
            cursor: "default",
            transition: "text-shadow 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textShadow = "0 0 45px #39ff1488";
            e.currentTarget.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textShadow = "0 0 30px #39ff1433";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          Milan Sahoo
        </h2>

        <h3
          className="reveal-text"
          style={{
            color: "#39FF14",
            fontSize: "1.4rem",
            fontWeight: 700,
            marginBottom: "14px",
          }}
        >
          About Me
        </h3>

        <p
          className="reveal-text"
          style={{
            color: "#ffffffcc",
            fontSize: "0.92rem",
            lineHeight: 1.85,
            marginBottom: "40px",
            maxWidth: "620px",
          }}
        >
          Hi, I'm Milan Sahoo, a Full-Stack Developer driven by a passion for
          merging data-driven logic with pixel-perfect design. I specialize in
          turning complex wireframes into responsive, high-performance web
          solutions that users love to interact with. My primary toolkit
          includes React, Node.js, and Tailwind CSS, and I place a massive focus
          on writing clean, accessible code.
        </p>

        {/* Skills */}
        <h3
          className="reveal-text"
          style={{
            color: "#39FF14",
            fontSize: "1.1rem",
            fontWeight: 700,
            marginBottom: "4px",
          }}
        >
          Skills
        </h3>
        <p
          className="reveal-text"
          style={{
            color: "#ffffff55",
            fontSize: "0.82rem",
            marginBottom: "20px",
            letterSpacing: "0.05em",
          }}
        >
          Full-Stack Developer
        </p>

        {/* ✅ Skill icons — tighter gap on mobile, wraps naturally */}
        <div
          className="skills-grid reveal-text"
          style={{
            display: "flex",
            gap: isMobile ? "12px" : "18px",
            flexWrap: "wrap",
            marginBottom: "44px",
          }}
        >
          {skills.map((s) => (
            <IconCard key={s.name} item={s} glowColor="green" />
          ))}
        </div>

        {/* Tools & IDEs */}
        <h3
          className="reveal-text"
          style={{
            color: "#39FF14",
            fontSize: "1.1rem",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          Tools &amp; IDEs
        </h3>
        <div
          className="tools-grid reveal-text"
          style={{
            display: "flex",
            gap: isMobile ? "12px" : "18px",
            flexWrap: "wrap",
            marginBottom: "44px",
          }}
        >
          {tools.map((t) => (
            <IconCard key={t.name} item={t} glowColor="purple" />
          ))}
        </div>

        {/* Other Libraries */}
        <h3
          className="reveal-text"
          style={{
            color: "#39FF14",
            fontSize: "1.1rem",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          Other Libraries
        </h3>
        <p
          className="reveal-text"
          style={{
            color: "#ffffff99",
            fontSize: "0.9rem",
            letterSpacing: "0.03em",
            lineHeight: 1.8,
            // ✅ Wrap naturally on mobile instead of single long line
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 20px",
          }}
        >
          {[
            "Tailwind CSS",
            "GSAP",
            "Framer Motion",
            "Next.js",
            "Locomotive Scroll",
          ].map((lib) => (
            <span key={lib}>{lib}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
