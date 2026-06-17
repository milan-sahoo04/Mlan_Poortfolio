import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Alok Kumar Pati",
    role: "Assistant Professor, ResearchLab",
    img: "/src/assets/Alok.avif",
    quote:
      "Milan delivered our research portfolio site exactly how we envisioned it — clean, fast, and professional. Communication was smooth throughout the project.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Founder, Bhojanam",
    img: null,
    quote:
      "Working with Milan was a great experience. He understood our food delivery business needs and built a platform that actually converts visitors into orders.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Product Lead, NotesHub",
    img: null,
    quote:
      "Milan's attention to detail on the UI was outstanding. The notes platform feels modern and the animations make it stand out from other student tools.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Iyer",
    role: "Operations Manager, FacultyHub",
    img: null,
    quote:
      "Quick turnaround, clean code, and great design sense. Milan took our vague requirements and turned them into a polished, working product.",
    rating: 5,
  },
  {
    id: 5,
    name: "Arjun Nair",
    role: "Co-founder, Medicus HMS",
    img: null,
    quote:
      "Reliable and skilled developer. Milan kept us updated at every step and delivered a hospital management interface that our clients love using daily.",
    rating: 5,
  },
];

// Simple placeholder avatar initials for clients without a real photo
function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarRow({ count }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#39FF14">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div
      className="testimonial-card"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #0a0a18 100%)",
        border: "1px solid #ffffff14",
        borderRadius: "18px",
        padding: "28px 26px",
        width: "340px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        transition:
          "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow =
          "0 24px 60px -14px #39FF1433, 0 0 0 1px #39FF1433";
        e.currentTarget.style.borderColor = "#39FF1455";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#ffffff14";
      }}
    >
      <StarRow count={t.rating} />

      {/* Quote */}
      <p
        style={{
          color: "#ffffffcc",
          fontSize: "0.9rem",
          lineHeight: 1.7,
          marginBottom: "24px",
          flex: 1,
          fontFamily: "Inter, sans-serif",
        }}
      >
        “{t.quote}”
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            position: "relative",
            width: "48px",
            height: "48px",
            flexShrink: 0,
          }}
        >
          {/* Glow ring */}
          <div
            style={{
              position: "absolute",
              inset: "-3px",
              borderRadius: "50%",
              background: "conic-gradient(#39FF14, #6366f1, #39FF14)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "2px solid #000",
              overflow: "hidden",
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            {t.img ? (
              <img
                src={t.img}
                alt={t.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span
                style={{
                  color: "#39FF14",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {getInitials(t.name)}
              </span>
            )}
          </div>
        </div>

        <div>
          <p
            style={{
              color: "#fff",
              fontSize: "0.88rem",
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              marginBottom: "2px",
            }}
          >
            {t.name}
          </p>
          <p
            style={{
              color: "#ffffff66",
              fontSize: "0.74rem",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading + subtitle entrance
      gsap.fromTo(
        ".testimonials-heading, .testimonials-sub",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // Continuous infinite marquee sliding
      const track = trackRef.current;
      const totalWidth = track.scrollWidth / 2;

      tweenRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: 32,
        ease: "none",
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        background: "#000",
        padding: "100px 0 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-8%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, #1a1aff33 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0%",
          right: "-8%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, #39FF1422 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <h2
        className="testimonials-heading"
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          color: "#39FF14",
          textAlign: "center",
          letterSpacing: "0.04em",
          marginBottom: "14px",
          position: "relative",
          zIndex: 1,
          textShadow: "0 0 40px #39ff1433",
          padding: "0 24px",
        }}
      >
        CLIENT TESTIMONIALS
      </h2>
      <p
        className="testimonials-sub"
        style={{
          textAlign: "center",
          color: "#ffffff66",
          fontSize: "0.92rem",
          marginBottom: "60px",
          position: "relative",
          zIndex: 1,
          padding: "0 24px",
        }}
      >
        What clients say after working with me.
      </p>

      {/* Sliding track wrapper with edge fade masks */}
      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
        onMouseEnter={() => tweenRef.current && tweenRef.current.pause()}
        onMouseLeave={() => tweenRef.current && tweenRef.current.resume()}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "24px",
            width: "max-content",
            padding: "4px 0",
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
