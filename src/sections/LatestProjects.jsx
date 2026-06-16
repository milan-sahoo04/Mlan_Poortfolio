import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import project1 from "../assets/project1.avif";
import project2 from "../assets/project2.avif";
import project3 from "../assets/project3.avif";
import project4 from "../assets/project4.avif";
import project5 from "../assets/project5.avif";
import project6 from "../assets/project6.avif";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "BHOJANAM",
    subtitle: "Food Delivery App",
    desc: "A full-stack food ordering platform with menus, diet plans, kids meals, and subscriptions.",
    img: project1,
    link: "https://bhojanam-food-delivery-app.vercel.app",
    deployed: true,
    bg: "linear-gradient(160deg, #0f0f1a 0%, #1a0d2e 100%)",
    accent: "#7c3aed",
  },
  {
    id: 2,
    title: "NOTESHUB",
    subtitle: "Notes Sharing Platform",
    desc: "Community-powered study notes platform — discover, upload, and share notes effortlessly.",
    img: project2,
    link: "https://playful-genie-1f03b8.netlify.app",
    deployed: true,
    bg: "linear-gradient(160deg, #0d1533 0%, #0a1a3a 100%)",
    accent: "#3b82f6",
  },
  {
    id: 3,
    title: "RESEARCHLAB",
    subtitle: "Academic Research Portfolio",
    desc: "A research showcase site for publications, citations, and team profiles in computer vision.",
    img: project3,
    link: "https://alokpatiresearch.netlify.app",
    deployed: true,
    bg: "linear-gradient(160deg, #0a1a0a 0%, #0d2010 100%)",
    accent: "#22c55e",
  },
  {
    id: 4,
    title: "FLAPPY BIRD",
    subtitle: "Desktop Game",
    desc: "A classic Flappy Bird clone built as a desktop app with pixel-art graphics and scoring.",
    img: project4,
    link: null,
    deployed: false,
    bg: "linear-gradient(160deg, #1a1000 0%, #2a1a00 100%)",
    accent: "#f59e0b",
  },
  {
    id: 5,
    title: "FACULTYHUB",
    subtitle: "Education Management",
    desc: "A high-performance workspace for faculty and students to manage schedules and data in real-time.",
    img: project5,
    link: null,
    deployed: false,
    bg: "linear-gradient(160deg, #1a0a0a 0%, #2a0d0d 100%)",
    accent: "#ef4444",
  },
  {
    id: 6,
    title: "MEDICUS HMS",
    subtitle: "Hospital Management System",
    desc: "A complete hospital management solution covering administrative, financial, and inventory workflows.",
    img: project6,
    link: null,
    deployed: false,
    bg: "linear-gradient(160deg, #001a1a 0%, #002a2a 100%)",
    accent: "#06b6d4",
  },
];

function ProjectCard({ project, imgHeight = 240, isMobile }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    gsap.fromTo(
      el,
      { y: 70, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
      },
    );
  }, []);

  // ✅ Reduce imgHeight on mobile to avoid very tall narrow cards
  const resolvedImgHeight = isMobile ? Math.min(imgHeight, 200) : imgHeight;

  return (
    <div
      ref={cardRef}
      style={{
        background: project.bg,
        borderRadius: "16px",
        border: "1px solid #ffffff12",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        // ✅ cursor: pointer on mobile (was cursor: none)
        cursor: project.link ? "pointer" : "default",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        willChange: "transform, opacity",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = project.accent + "55";
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 20px 50px ${project.accent}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#ffffff12";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={() => project.link && window.open(project.link, "_blank")}
    >
      {/* Image area */}
      <div
        style={{
          height: `${resolvedImgHeight}px`,
          background: "#111",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <img
          src={project.img}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.06)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 50%, ${project.bg.split(",")[0].replace("linear-gradient(160deg, ", "")} 100%)`,
            pointerEvents: "none",
          }}
        />
        {project.deployed && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "#39FF1422",
              border: "1px solid #39FF1466",
              borderRadius: "999px",
              padding: "3px 10px",
              fontSize: "0.65rem",
              color: "#39FF14",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            LIVE
          </div>
        )}
      </div>

      {/* Text area */}
      <div
        style={{
          padding: isMobile ? "18px 20px 22px" : "22px 26px 28px",
          flex: 1,
        }}
      >
        <p
          style={{
            color: "#ffffff44",
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            marginBottom: "4px",
            textTransform: "uppercase",
          }}
        >
          {project.subtitle}
        </p>
        <h3
          style={{
            color: "#39FF14",
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            // ✅ Slightly smaller title on mobile so it doesn't crowd
            fontSize: isMobile ? "1.15rem" : "1.4rem",
            letterSpacing: "0.04em",
            marginBottom: "10px",
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            color: "#ffffffaa",
            fontSize: isMobile ? "0.82rem" : "0.85rem",
            lineHeight: 1.72,
          }}
        >
          {project.desc}
        </p>
        {project.link && (
          <div
            style={{
              marginTop: "16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: project.accent,
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            VIEW PROJECT
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LatestProjects() {
  const headingRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      },
    );
  }, []);

  return (
    <section
      id="work"
      style={{
        background: "#000",
        // ✅ Reduced vertical padding on mobile
        padding: isMobile
          ? "70px 20px 80px"
          : "100px clamp(30px, 5vw, 80px) 120px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ── MOBILE layout: heading full-width, then all cards stacked ── */}
      {isMobile && (
        <>
          {/* Heading */}
          <div ref={headingRef} style={{ marginBottom: "36px" }}>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.6rem, 12vw, 4rem)",
                color: "#39FF14",
                lineHeight: 0.95,
                letterSpacing: "0.02em",
              }}
            >
              LATEST
              <br />
              PROJECTS
            </h2>
            <p
              style={{
                color: "#ffffff44",
                fontSize: "0.85rem",
                marginTop: "16px",
                lineHeight: 1.6,
              }}
            >
              A selection of projects I've built — from full-stack web apps to
              desktop tools and academic platforms.
            </p>
          </div>

          {/* ✅ All 6 cards in a single column */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                imgHeight={200}
                isMobile={true}
              />
            ))}
          </div>
        </>
      )}

      {/* ── DESKTOP layout: original asymmetric grid ── */}
      {!isMobile && (
        <>
          {/* Row 1: Heading left + Bhojanam right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "28px",
              alignItems: "start",
              marginBottom: "28px",
            }}
          >
            <div ref={headingRef} style={{ paddingTop: "8px" }}>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  color: "#39FF14",
                  lineHeight: 0.95,
                  letterSpacing: "0.02em",
                }}
              >
                LATEST
                <br />
                PROJECTS
              </h2>
              <p
                style={{
                  color: "#ffffff44",
                  fontSize: "0.85rem",
                  marginTop: "20px",
                  lineHeight: 1.6,
                  maxWidth: "280px",
                }}
              >
                A selection of projects I've built — from full-stack web apps to
                desktop tools and academic platforms.
              </p>
            </div>
            <ProjectCard
              project={projects[0]}
              imgHeight={300}
              isMobile={false}
            />
          </div>

          {/* Row 2: NotesHub + ResearchLab */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "28px",
              marginBottom: "28px",
            }}
          >
            <ProjectCard
              project={projects[1]}
              imgHeight={220}
              isMobile={false}
            />
            <ProjectCard
              project={projects[2]}
              imgHeight={220}
              isMobile={false}
            />
          </div>

          {/* Row 3: Flappy Bird + FacultyHub */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "28px",
              marginBottom: "28px",
            }}
          >
            <ProjectCard
              project={projects[3]}
              imgHeight={220}
              isMobile={false}
            />
            <ProjectCard
              project={projects[4]}
              imgHeight={220}
              isMobile={false}
            />
          </div>

          {/* Row 4: Medicus HMS — full width horizontal card */}
          <div>
            <div
              style={{
                background: projects[5].bg,
                borderRadius: "16px",
                border: "1px solid #ffffff12",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                transition:
                  "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = projects[5].accent + "55";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 20px 50px ${projects[5].accent}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#ffffff12";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  height: "280px",
                  background: "#111",
                  overflow: "hidden",
                }}
              >
                <img
                  src={projects[5].img}
                  alt={projects[5].title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    transition: "transform 0.5s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
              <div
                style={{
                  padding: "40px 36px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: "#ffffff44",
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    marginBottom: "6px",
                  }}
                >
                  {projects[5].subtitle}
                </p>
                <h3
                  style={{
                    color: "#39FF14",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "1.8rem",
                    letterSpacing: "0.04em",
                    marginBottom: "14px",
                  }}
                >
                  {projects[5].title}
                </h3>
                <p
                  style={{
                    color: "#ffffffaa",
                    fontSize: "0.88rem",
                    lineHeight: 1.75,
                  }}
                >
                  {projects[5].desc}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
