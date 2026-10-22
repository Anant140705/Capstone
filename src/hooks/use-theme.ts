import { useCallback, useEffect, useSyncExternalStore } from "react";

const KEY = "atb-theme";
const EVENT = "atb-theme-change";
const TRANSITION_DURATION = 420;
let transitionTimer: ReturnType<typeof setTimeout> | null = null;

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): "light" | "dark" {
  return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light" as const);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = useCallback(() => {
    const next = getSnapshot() === "dark" ? "light" : "dark";

    if (transitionTimer) clearTimeout(transitionTimer);
    document.documentElement.classList.add("theme-switching");

    transitionTimer = setTimeout(() => {
      localStorage.setItem(KEY, next);
      document.documentElement.classList.toggle("dark", next === "dark");
      window.dispatchEvent(new Event(EVENT));

      transitionTimer = setTimeout(() => {
        document.documentElement.classList.remove("theme-switching");
        transitionTimer = null;
      }, TRANSITION_DURATION / 2);
    }, TRANSITION_DURATION / 2);
  }, []);

  return { theme, toggle };
}
