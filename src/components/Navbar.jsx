import { useState, useEffect } from "react";

const navLinks = [
  { label: "HOME", id: "home" },
  { label: "WORK", id: "work" },
  { label: "CONTACT", id: "contact" },
  { label: "ABOUT", id: "about" },
  {
    label: "RESUME",
    href: "https://drive.google.com/file/d/1hcWRNAqyd29_-oyWVG1lKaOB3UOadv-3/view?usp=drivesdk",
  },
];

export default function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Transparent when at top, dark when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section on scroll
  useEffect(() => {
    const sectionIds = ["home", "about", "work", "contact"];
    const onScroll = () => {
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "16px 20px" : "20px 40px",
          background: scrolled || menuOpen ? "rgba(0,0,0,0.92)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(10px)" : "none",
          borderBottom: scrolled && !menuOpen ? "1px solid #ffffff0a" : "none",
          transition:
            "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <div
          onMouseEnter={() => !isMobile && setHovered(true)}
          onMouseLeave={() => !isMobile && setHovered(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            overflow: "hidden",
            cursor: isMobile ? "pointer" : "none",
            flexShrink: 0,
          }}
          onClick={() => scrollTo("home")}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            style={{
              transform: hovered ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.6s ease",
              flexShrink: 0,
            }}
          >
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          </svg>
          <span
            style={{
              fontFamily: "Dancing Script, cursive",
              fontSize: "1.25rem",
              color: "#fff",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              display: "inline-block",
              // On mobile always show logo text; on desktop animate
              transform:
                isMobile || hovered ? "translateX(0)" : "translateX(-120%)",
              opacity: isMobile || hovered ? 1 : 0,
              transition: "transform 0.45s ease, opacity 0.35s ease",
            }}
          >
            code by Milan
          </span>
        </div>

        {/* Desktop Nav links */}
        {!isMobile && (
          <ul
            style={{
              display: "flex",
              gap: "44px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((item) => {
              const isActive = active === item.id;
              return (
                <li
                  key={item.label}
                  onClick={() => {
                    if (item.href) window.open(item.href, "_blank");
                    else scrollTo(item.id);
                  }}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    letterSpacing: "0.06em",
                    color: isActive ? "#fff" : "#e5e5e5aa",
                    cursor: "none",
                    transition: "color 0.2s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive
                      ? "#fff"
                      : "#e5e5e5aa")
                  }
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#39FF14",
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Hamburger button — mobile only */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              zIndex: 201,
            }}
          >
            {/* Three bars that animate to X */}
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  background: "#fff",
                  borderRadius: "2px",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transformOrigin: "center",
                  transform: menuOpen
                    ? i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : i === 2
                        ? "translateY(-7px) rotate(-45deg)"
                        : "scaleX(0)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile full-screen menu overlay */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.97)",
            zIndex: 199,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "36px",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.4s cubic-bezier(0.77, 0, 0.175, 1)",
          }}
        >
          {navLinks.map((item, idx) => {
            const isActive = active === item.id;
            return (
              <div
                key={item.label}
                onClick={() => {
                  if (item.href) {
                    window.open(item.href, "_blank");
                    setMenuOpen(false);
                  } else {
                    scrollTo(item.id);
                  }
                }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "2rem",
                  letterSpacing: "0.08em",
                  color: isActive ? "#fff" : "#ffffff55",
                  cursor: "pointer",
                  transition: "color 0.2s, transform 0.2s",
                  position: "relative",
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: menuOpen ? `${idx * 0.06}s` : "0s",
                }}
                onTouchStart={(e) => (e.currentTarget.style.color = "#fff")}
                onTouchEnd={(e) =>
                  (e.currentTarget.style.color = isActive
                    ? "#fff"
                    : "#ffffff55")
                }
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-6px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#39FF14",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
