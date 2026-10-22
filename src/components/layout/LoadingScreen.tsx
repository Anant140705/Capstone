import { useEffect, useRef, useState } from "react";

type LoadingState = "visible" | "exiting" | "hidden";

export function LoadingScreen() {
  const [state, setState] = useState<LoadingState>("visible");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const finish = () => {
    if (state !== "visible") return;
    setState("exiting");
    timeoutRef.current = setTimeout(() => setState("hidden"), 1500);
  };

  if (state === "hidden") return null;

  return (
    <div
      aria-label="Loading GoWander"
      className={`loading-screen loading-screen--${state}`}
      role="status"
    >
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={(event) => {
          console.error("The loading animation could not be played.", event);
          finish();
        }}
      >
        <source src="/loading-animation.mp4" type="video/mp4" />
      </video>
    </div>
  );
}