import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    label: "LinkedIn",
    val: "milan-sahoo2004",
    href: "https://www.linkedin.com/in/milan-sahoo2004/",
    color: "#0A66C2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Whatsapp",
    val: "+91 8260677900",
    href: "https://wa.me/918260677900",
    color: "#25D366",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.529 5.858L.057 23.571a.5.5 0 00.612.612l5.713-1.472A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.389.873.893-3.263-.235-.374A9.861 9.861 0 012.118 12C2.118 6.533 6.533 2.118 12 2.118S21.882 6.533 21.882 12 17.467 21.882 12 21.882z" />
      </svg>
    ),
  },
  {
    label: "Mail",
    val: "milansahoo6969@gmail.com",
    href: "mailto:milansahoo6969@gmail.com",
    color: "#EA4335",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    val: "milan-sahoo04",
    href: "https://github.com/milan-sahoo04",
    color: "#555",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    val: "@iam_milan19",
    href: "https://www.instagram.com/iam_milan19/",
    color: "#E1306C",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    val: "milan.sahoo",
    href: "https://www.facebook.com/milan.sahoo.90813",
    color: "#1877F2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

// Desktop orbital positions (unchanged from original)
const positions = [
  { angle: -60, radius: 190 },
  { angle: -20, radius: 200 },
  { angle: 20, radius: 200 },
  { angle: 60, radius: 190 },
  { angle: 100, radius: 185 },
  { angle: 140, radius: 185 },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const ringRef = useRef(null);
  const chipRefs = useRef([]);
  const socialRef = useRef(null);
  const socialRowRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    // Photo + ring entrance
    gsap.fromTo(
      [photoRef.current, ringRef.current].filter(Boolean),
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    // Ring spin
    if (ringRef.current) {
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 10,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });
    }

    // Chips pop in
    const validChips = chipRefs.current.filter(Boolean);
    gsap.fromTo(
      validChips,
      { scale: 0, opacity: 0, x: -20 },
      {
        scale: 1,
        opacity: 1,
        x: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    // Float chips only on desktop
    if (!isMobile) {
      validChips.forEach((chip, i) => {
        gsap.to(chip, {
          y: -10,
          duration: 1.8 + i * 0.25,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.18,
        });
      });
    }

    // Right rows slide in
    const validRows = socialRowRefs.current.filter(Boolean);
    gsap.fromTo(
      validRows,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: socialRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      },
    );
  }, [isMobile]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: "#000",
        padding: isMobile
          ? "60px 20px 80px"
          : "80px clamp(30px, 6vw, 80px) 100px",
        borderTop: "1px solid #ffffff11",
        // ✅ Stack vertically on mobile, side-by-side on desktop
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: isMobile ? "50px" : "60px",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Subtle bg glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, #39FF1408 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* ── LEFT: Photo + social chips ── */}
      <div
        style={{
          position: "relative",
          // ✅ Full width on mobile, fixed on desktop
          width: isMobile ? "100%" : "420px",
          minHeight: isMobile ? "auto" : "420px",
        }}
      >
        <h3
          style={{
            color: "#39FF14",
            fontSize: isMobile ? "1.5rem" : "1.8rem",
            fontWeight: 700,
            marginBottom: "36px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Contact Me
        </h3>

        {/* ── DESKTOP: Photo + orbital chips ── */}
        {!isMobile && (
          <div
            style={{ position: "relative", width: "200px", height: "200px" }}
          >
            {/* Spinning dashed ring */}
            <svg
              ref={ringRef}
              width="220"
              height="220"
              viewBox="0 0 220 220"
              style={{
                position: "absolute",
                top: "-10px",
                left: "-10px",
                zIndex: 0,
              }}
            >
              <circle
                cx="110"
                cy="110"
                r="105"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="12 8"
                opacity="0.7"
              />
              <circle
                cx="110"
                cy="110"
                r="96"
                fill="none"
                stroke="#39FF1433"
                strokeWidth="1"
                strokeDasharray="6 12"
              />
            </svg>

            {/* Photo circle */}
            <div
              ref={photoRef}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid #6366f155",
                boxShadow: "0 0 40px #6366f133",
                position: "relative",
                zIndex: 1,
                background: "#111",
              }}
            >
              <img
                src="src/assets/myphoto2.avif"
                alt="Milan"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>

            {/* Orbital chips */}
            {socials.map((s, i) => {
              const { angle, radius } = positions[i];
              const rad = (angle * Math.PI) / 180;
              const cx = 100 + Math.cos(rad) * radius;
              const cy = 100 + Math.sin(rad) * radius;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  ref={(el) => (chipRefs.current[i] = el)}
                  style={{
                    position: "absolute",
                    left: `${cx}px`,
                    top: `${cy}px`,
                    transform: "translate(-50%, -50%)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#111",
                    border: `1px solid ${s.color}44`,
                    borderRadius: "999px",
                    padding: "8px 14px 8px 8px",
                    textDecoration: "none",
                    cursor: "pointer",
                    zIndex: 2,
                    boxShadow: `0 4px 20px ${s.color}22`,
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = s.color;
                    e.currentTarget.style.boxShadow = `0 4px 24px ${s.color}55`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${s.color}44`;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${s.color}22`;
                  }}
                >
                  <span
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: s.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </span>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "0.78rem",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </span>
                </a>
              );
            })}
          </div>
        )}

        {/* ── MOBILE: Photo centered + chip grid below ── */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "28px",
            }}
          >
            {/* Photo circle — no orbital ring, just a clean glow border */}
            <div
              ref={photoRef}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid #6366f155",
                boxShadow: "0 0 40px #6366f133",
                background: "#111",
                flexShrink: 0,
              }}
            >
              <img
                src="src/assets/myphoto2.avif"
                alt="Milan"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>

            {/* ✅ Chip grid — 2 columns, no absolute positioning */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                width: "100%",
              }}
            >
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  ref={(el) => (chipRefs.current[i] = el)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#111",
                    border: `1px solid ${s.color}44`,
                    borderRadius: "10px",
                    padding: "10px 12px",
                    textDecoration: "none",
                    cursor: "pointer",
                    boxShadow: `0 2px 12px ${s.color}18`,
                    transition: "border-color 0.2s",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.borderColor = s.color;
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.borderColor = `${s.color}44`;
                  }}
                >
                  <span
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: s.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </span>
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "0.78rem",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT: Social links list + buttons ── */}
      <div
        ref={socialRef}
        style={{
          // ✅ No minWidth on mobile — let it be full width
          width: isMobile ? "100%" : undefined,
          minWidth: isMobile ? "unset" : "340px",
          flex: 1,
          maxWidth: isMobile ? "100%" : "500px",
        }}
      >
        <h3
          style={{
            color: "#fff",
            fontSize: isMobile ? "1.3rem" : "1.6rem",
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            borderBottom: "1px solid #ffffff22",
            paddingBottom: "14px",
            marginBottom: "28px",
          }}
        >
          Social Links
        </h3>

        {socials.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            ref={(el) => (socialRowRefs.current[i] = el)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
              textDecoration: "none",
              cursor: "pointer",
              padding: "6px 0",
              transition: "opacity 0.2s",
              WebkitTapHighlightColor: "transparent",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <span
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: s.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {s.icon}
            </span>

            <span
              style={{
                color: "#ffffff55",
                fontSize: "0.78rem",
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                // ✅ Narrower label column on mobile
                width: isMobile ? "72px" : "90px",
                flexShrink: 0,
              }}
            >
              {s.label}
            </span>

            {/* ✅ Email truncates on mobile instead of overflowing */}
            <span
              style={{
                color: "#ffffffcc",
                fontSize: isMobile ? "0.78rem" : "0.85rem",
                fontFamily: "Inter, sans-serif",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                minWidth: 0,
              }}
            >
              {s.val}
            </span>
          </a>
        ))}

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            // ✅ Stack buttons on very small screens
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          <a
            href="https://drive.google.com/file/d/1hcWRNAqyd29_-oyWVG1lKaOB3UOadv-3/view?usp=drivesdk"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #333",
              borderRadius: "10px",
              padding: "12px 20px",
              fontSize: "0.85rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "border-color 0.2s, box-shadow 0.2s",
              WebkitTapHighlightColor: "transparent",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#555";
              e.currentTarget.style.boxShadow = "0 0 20px #ffffff11";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#333";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get My Resume
          </a>

          <a
            href="https://drive.google.com/file/d/1hcWRNAqyd29_-oyWVG1lKaOB3UOadv-3/view?usp=drivesdk"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#39FF14",
              color: "#000",
              border: "none",
              borderRadius: "10px",
              padding: "12px 20px",
              fontSize: "0.85rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 0 20px #39FF1433",
              WebkitTapHighlightColor: "transparent",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 30px #39FF1466";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 20px #39FF1433";
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="2.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
