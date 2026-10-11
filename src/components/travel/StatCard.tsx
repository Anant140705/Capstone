import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  icon,
  hint,
  className,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon?: ReactNode;
  hint?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className={cn("surface p-5", className)}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight">
        {prefix}
        {display.toLocaleString("en-IN")}
        {suffix}
      </p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </motion.div>
  );
}
