import { useEffect, useRef } from "react";

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let animationFrame = 0;
    let currentX = 0;
    let currentY = 0;
    let hasPosition = false;

    const animate = () => {
      const target = pointerRef.current;
      if (!hasPosition) {
        currentX = target.x;
        currentY = target.y;
        hasPosition = true;
      } else {
        const easing = reducedMotion ? 1 : 0.08;
        currentX += (target.x - currentX) * easing;
        currentY += (target.y - currentY) * easing;
      }

      dot.style.left = `${target.x}px`;
      dot.style.top = `${target.y}px`;

      ring.style.left = `${currentX}px`;
      ring.style.top = `${currentY}px`;
      animationFrame = requestAnimationFrame(animate);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;

      const target = event.target;
      const isButton =
        target instanceof Element &&
        Boolean(target.closest("button, a, [role='button']"));

      pointerRef.current = { x: event.clientX, y: event.clientY };
      dot.classList.toggle("is-button", isButton);
      ring.classList.toggle("is-button", isButton);
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
    };

    const hide = () => {
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible");
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerout", handlePointerOut);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", handlePointerOut);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-follower-ring" />
      <div ref={dotRef} aria-hidden="true" className="cursor-follower-dot" />
    </>
  );
}
