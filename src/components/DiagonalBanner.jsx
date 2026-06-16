import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function DiagonalBanner() {
  const t1 = useRef(null),
    t2 = useRef(null);

  useEffect(() => {
    gsap.to(t1.current, { x: "-50%", duration: 14, ease: "none", repeat: -1 });
    gsap.to(t2.current, { x: "50%", duration: 14, ease: "none", repeat: -1 });
  }, []);

  const txt =
    "✦ HIRE ME  />_  GET IN TOUCH  </>  CONTACT ME  ✦ HIRE ME  />_  GET IN TOUCH  </>  CONTACT ME  ";

  const bandStyle = {
    position: "absolute",
    width: "200%",
    background: "#C0392B",
    color: "#fff",
    padding: "10px 0",
    overflow: "hidden",
    whiteSpace: "nowrap",
    top: 0,
    left: "-50%",
  };

  const textStyle = {
    display: "inline-block",
    fontFamily: "Bebas Neue, sans-serif",
    letterSpacing: "0.15em",
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        margin: "40px 0",
      }}
      className="diagonal-banner"
    >
      {/* top band */}
      <div
        style={{
          ...bandStyle,
          transform: "rotate(-6deg) translateY(10px)",
        }}
      >
        <span ref={t1} style={textStyle} className="banner-text">
          {txt.repeat(4)}
        </span>
      </div>

      {/* bottom band */}
      <div
        style={{
          ...bandStyle,
          transform: "rotate(-6deg) translateY(50px)",
        }}
      >
        <span ref={t2} style={textStyle} className="banner-text">
          {txt.repeat(4)}
        </span>
      </div>

      <style>{`
        /* ── Desktop ── */
        .diagonal-banner {
          height: 120px;
        }
        .banner-text {
          font-size: 1rem;
        }

        /* ── Tablet ── */
        @media (max-width: 768px) {
          .diagonal-banner {
            height: 100px;
            margin: 28px 0;
          }
          .banner-text {
            font-size: 0.9rem;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .diagonal-banner {
            height: 88px;
            margin: 20px 0;
          }
          .banner-text {
            font-size: 0.82rem;
            letter-spacing: 0.1em;
          }
        }

        /* ── Mobile small ── */
        @media (max-width: 390px) {
          .diagonal-banner {
            height: 80px;
            margin: 16px 0;
          }
          .banner-text {
            font-size: 0.75rem;
            letter-spacing: 0.08em;
          }
        }
      `}</style>
    </div>
  );
}
