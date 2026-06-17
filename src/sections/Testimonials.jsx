import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import testi from "../assets/Alok.avif";
import testi1 from "../assets/testi1.avif";
import testi2 from "../assets/testi2.avif";
import testi3 from "../assets/testi3.avif";
import testi4 from "../assets/testi4.avif";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Alok Kumar Pati",
    role: "Assistant Professor, ResearchLab",
    img: testi,
    quote:
      "Milan delivered our research portfolio site exactly how we envisioned it — clean, fast, and professional. Communication was smooth throughout the project.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Founder, Bhojanam",
    img: testi1,
    quote:
      "Working with Milan was a great experience. He understood our food delivery business needs and built a platform that actually converts visitors into orders.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Product Lead, NotesHub",
    img: testi2,
    quote:
      "Milan's attention to detail on the UI was outstanding. The notes platform feels modern and the animations make it stand out from other student tools.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Iyer",
    role: "Operations Manager, FacultyHub",
    img: testi3,
    quote:
      "Quick turnaround, clean code, and great design sense. Milan took our vague requirements and turned them into a polished, working product.",
    rating: 5,
  },
  {
    id: 5,
    name: "Arjun Nair",
    role: "Co-founder, Medicus HMS",
    img: testi4,
    quote:
      "Reliable and skilled developer. Milan kept us updated at every step and delivered a hospital management interface that our clients love using daily.",
    rating: 5,
  },
];

function StarRow({ count }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#39FF14">
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
        background: "linear-gradient(150deg, #0a0a0a 0%, #0a0a1c 100%)",
        border: "1px solid #ffffff14",
        borderRadius: "20px",
        width: "300px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        transition:
          "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.45s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px) scale(1.025)";
        e.currentTarget.style.boxShadow =
          "0 28px 64px -16px #39FF1444, 0 0 0 1px #39FF1455";
        e.currentTarget.style.borderColor = "#39FF1455";

        const photo = e.currentTarget.querySelector(".card-photo-img");
        if (photo) photo.style.transform = "scale(1.07)";

        const overlay = e.currentTarget.querySelector(".card-photo-overlay");
        if (overlay) overlay.style.opacity = "0.85";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#ffffff14";

        const photo = e.currentTarget.querySelector(".card-photo-img");
        if (photo) photo.style.transform = "scale(1)";

        const overlay = e.currentTarget.querySelector(".card-photo-overlay");
        if (overlay) overlay.style.opacity = "0.55";
      }}
    >
      {/* ── Square photo, full card width, no cropping issues ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          background: "#111",
        }}
      >
        <img
          className="card-photo-img"
          src={t.img}
          alt={t.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            transition: "transform 0.55s ease",
            display: "block",
          }}
        />

        {/* Bottom gradient overlay so name/role sit readably on the photo edge */}
        <div
          className="card-photo-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 55%, #000000cc 100%)",
            opacity: 0.55,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Name + role anchored at bottom of photo */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "18px",
            right: "18px",
          }}
        >
          <p
            style={{
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              marginBottom: "2px",
              textShadow: "0 2px 8px #00000099",
            }}
          >
            {t.name}
          </p>
          <p
            style={{
              color: "#ffffffcc",
              fontSize: "0.74rem",
              fontFamily: "Inter, sans-serif",
              marginBottom: "8px",
              textShadow: "0 2px 6px #00000099",
            }}
          >
            {t.role}
          </p>
          <StarRow count={t.rating} />
        </div>
      </div>

      {/* ── Description directly under the photo ── */}
      <p
        style={{
          color: "#ffffffb0",
          fontSize: "0.85rem",
          lineHeight: 1.65,
          padding: "18px 20px 24px",
          fontFamily: "Inter, sans-serif",
          margin: 0,
        }}
      >
        “{t.quote}”
      </p>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Cards float up + rotate slightly in on entrance for more visual interest
      gsap.fromTo(
        ".testimonial-card",
        { y: 60, opacity: 0, scale: 0.9, rotate: -2 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
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
        padding: "100px 0 130px",
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
          marginBottom: "64px",
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
            gap: "26px",
            width: "max-content",
            padding: "10px 0 4px",
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
