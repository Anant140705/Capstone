import { useCallback, useEffect, useSyncExternalStore } from "react";

const KEY = "atb-theme";
const EVENT = "atb-theme-change";

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
    localStorage.setItem(KEY, next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { theme, toggle };
}
