import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Bhojanam",
    subtitle: "Food Delivery App",
    desc: "A full-stack food ordering platform with menus, diet plans, kids meals, and subscriptions.",
    img: "/src/assets/project1.avif",
    link: "https://bhojanam-food-delivery-app.vercel.app",
    deployed: true,
    span: "short",
  },
  {
    id: 2,
    title: "NotesHub",
    subtitle: "Notes Sharing Platform",
    desc: "Community-powered study notes platform — discover, upload, and share notes effortlessly.",
    img: "/src/assets/project2.avif",
    link: "https://playful-genie-1f03b8.netlify.app",
    deployed: true,
    span: "tall",
  },
  {
    id: 3,
    title: "ResearchLab",
    subtitle: "Academic Research Portfolio",
    desc: "A research showcase site for publications, citations, and team profiles in computer vision.",
    img: "/src/assets/project3.avif",
    link: "https://alokpatiresearch.netlify.app",
    deployed: true,
    span: "tall",
  },
  {
    id: 4,
    title: "Flappy Bird",
    subtitle: "Desktop Game",
    desc: "A classic Flappy Bird clone built as a desktop app with pixel-art graphics and scoring.",
    img: "/src/assets/project4.avif",
    link: null,
    deployed: false,
    span: "short",
  },
  {
    id: 5,
    title: "FacultyHub",
    subtitle: "Education Management",
    desc: "A high-performance workspace for faculty and students to manage schedules and data in real-time.",
    img: "/src/assets/project5.avif",
    link: null,
    deployed: false,
    span: "short",
  },
  {
    id: 6,
    title: "Medicus HMS",
    subtitle: "Hospital Management System",
    desc: "A complete hospital management solution covering administrative, financial, and inventory workflows.",
    img: "/src/assets/project6.avif",
    link: null,
    deployed: false,
    span: "tall",
  },
];

// Detect touch device once at module level
const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

function ProjectCard({ project }) {
  const { title, subtitle, desc, img, link, deployed, span } = project;
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const infoRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  // On touch devices: desc + btn are always visible (no hover possible)
  const alwaysShow = isTouchDevice;

  const handleEnter = () => {
    if (isTouchDevice) return;
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      duration: 0.35,
      ease: "power2.out",
      boxShadow: deployed
        ? "0 24px 60px -12px #39FF1444, 0 0 0 1px #39FF1444"
        : "0 24px 60px -12px #6366f133, 0 0 0 1px #6366f133",
    });
    gsap.to(imgRef.current, {
      scale: 1.06,
      duration: 0.45,
      ease: "power2.out",
    });
    gsap.to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(btnRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.05,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (isTouchDevice) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
      boxShadow: "0 0 0 0 transparent",
    });
    gsap.to(imgRef.current, { scale: 1, duration: 0.45, ease: "power2.out" });
    gsap.to(descRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(btnRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`project-card project-card--${span}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: "#0a0a0a",
        borderRadius: "18px",
        border: "1px solid #ffffff14",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: deployed && !isTouchDevice ? "none" : "default",
        willChange: "transform",
        transition: "border-color 0.35s ease",
      }}
    >
      {/* ── IMAGE AREA ── */}
      <div className={`project-img-wrap project-img-wrap--${span}`}>
        <img
          ref={imgRef}
          src={img}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
            willChange: "transform",
          }}
        />

        {/* Status badge */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: deployed ? "#39FF14" : "#000000bb",
            color: deployed ? "#000" : "#ffffffcc",
            fontSize: "0.62rem",
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: "999px",
            letterSpacing: "0.06em",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            zIndex: 3,
          }}
        >
          {deployed ? (
            <>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#000",
                  display: "inline-block",
                }}
              />
              LIVE
            </>
          ) : (
            "IN PROGRESS"
          )}
        </div>
      </div>

      {/* ── INFO AREA ── */}
      <div
        ref={infoRef}
        style={{
          flex: 1,
          padding: "16px 18px 18px",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
        }}
      >
        <h3
          style={{
            color: "#39FF14",
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: "1.05rem",
            letterSpacing: "0.02em",
            marginBottom: "3px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "#ffffff55",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          {subtitle}
        </p>

        {/* Desc — always visible on touch, hover-reveal on desktop */}
        <p
          ref={descRef}
          style={{
            color: "#ffffffbb",
            fontSize: "0.78rem",
            lineHeight: 1.6,
            marginBottom: "12px",
            opacity: alwaysShow ? 1 : 0,
            transform: alwaysShow ? "translateY(0)" : "translateY(8px)",
            willChange: "opacity, transform",
          }}
        >
          {desc}
        </p>

        {/* Button — always visible on touch, hover-reveal on desktop */}
        <div
          ref={btnRef}
          style={{
            opacity: alwaysShow ? 1 : 0,
            transform: alwaysShow ? "translateY(0)" : "translateY(8px)",
            willChange: "opacity, transform",
          }}
        >
          {deployed ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#39FF14",
                color: "#000",
                fontWeight: 700,
                fontSize: "0.75rem",
                padding: "8px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              View Live
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="3"
              >
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </a>
          ) : (
            <span
              style={{
                display: "inline-block",
                color: "#ffffff55",
                fontSize: "0.72rem",
                border: "1px solid #ffffff22",
                padding: "6px 12px",
                borderRadius: "8px",
              }}
            >
              Coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      const cards = gsap.utils.toArray(".project-card", sectionRef.current);
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 70, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
            delay: (i % 4) * 0.07,
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        background: "#000",
        padding: "80px clamp(16px, 5vw, 60px) 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blue glow */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "-8%",
          width: "650px",
          height: "650px",
          background: "radial-gradient(circle, #0a2a6e3a 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <h2
        className="projects-heading"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.7rem, 6vw, 3.5rem)",
          color: "#39FF14",
          textAlign: "center",
          letterSpacing: "0.05em",
          marginBottom: "12px",
          lineHeight: 1.15,
          position: "relative",
          zIndex: 1,
          textShadow: "0 0 40px #39ff1422",
        }}
      >
        INSTANT PROJECTS
        <br />
        OVERVIEW
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "#ffffff55",
          fontSize: "clamp(0.78rem, 2.5vw, 0.88rem)",
          marginBottom: "48px",
          letterSpacing: "0.03em",
          position: "relative",
          zIndex: 1,
          padding: "0 16px",
        }}
      >
        Real projects, built and shipped — some live, some in progress.
      </p>

      {/* Grid */}
      <div
        className="projects-masonry"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "220px",
          gap: "20px",
          position: "relative",
          zIndex: 1,
          maxWidth: "1500px",
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <style>{`
        /* ── Desktop tall/short spans ── */
        .project-card--tall { grid-row: span 2; }
        .project-card--short { grid-row: span 1; }

        /* ── Image wrapper heights ── */
        .project-img-wrap {
          flex-shrink: 0;
          overflow: hidden;
          position: relative;
          background: #111;
        }
        .project-img-wrap--tall { height: 260px; }
        .project-img-wrap--short { height: 180px; }

        /* ── Tablet: 2 columns ── */
        @media (max-width: 1000px) {
          .projects-masonry {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: auto !important;
          }
          .project-card--tall { grid-row: span 1 !important; }
          .project-img-wrap--tall { height: 200px !important; }
          .project-img-wrap--short { height: 160px !important; }
        }

        /* ── Mobile large (≤600px): 1 column ── */
        @media (max-width: 600px) {
          .projects-masonry {
            grid-template-columns: 1fr !important;
            grid-auto-rows: auto !important;
            gap: 14px !important;
          }
          .project-card--tall,
          .project-card--short { grid-row: span 1 !important; }
          .project-img-wrap--tall,
          .project-img-wrap--short { height: 180px !important; }
        }

        /* ── Mobile small (≤390px): tighter ── */
        @media (max-width: 390px) {
          .projects-masonry { gap: 12px !important; }
          .project-img-wrap--tall,
          .project-img-wrap--short { height: 160px !important; }
        }
      `}</style>
    </section>
  );
}
