import { useEffect } from "react";

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export default function CustomCursor() {
  useEffect(() => {
    // Don't run RAF loop on touch devices at all
    if (isTouchDevice) return;

    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    let mouseX = 0,
      mouseY = 0,
      curX = 0,
      curY = 0;
    let rafId;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      cursor.style.transform = `translate(${curX - 6}px, ${curY - 6}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Don't render the element at all on touch devices
  if (isTouchDevice) return null;

  return <div id="cursor" />;
}
