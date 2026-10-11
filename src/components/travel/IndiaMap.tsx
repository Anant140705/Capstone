import { motion } from "motion/react";
import { useState } from "react";
import { destinations, routeLines, type Destination } from "@/data/destinations";
import { cn } from "@/lib/utils";

/**
 * Stylised interactive map of India. Coordinates on destinations are
 * normalized 0-100 values inside this viewBox.
 */
const INDIA_PATH =
  "M40 4 L48 7 L54 4 L58 9 L66 8 L72 12 L70 18 L76 22 L84 20 L88 26 L82 33 L86 38 L80 42 L72 40 L66 44 L62 52 L58 60 L54 70 L48 82 L42 92 L36 96 L31 90 L28 78 L22 66 L18 56 L14 46 L12 36 L18 30 L22 22 L28 16 L32 8 Z";

type Props = {
  active?: string | null;
  onSelect?: (d: Destination) => void;
  showRoutes?: boolean;
  className?: string;
  items?: Destination[];
};

export function IndiaMap({ active, onSelect, showRoutes = true, className, items }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const points = items ?? destinations;
  const byId = (id: string) => destinations.find((d) => d.id === id);

  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-2xl bg-primary-soft/60", className)}>
      <div className="grid-faint absolute inset-0 opacity-40" aria-hidden />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="relative h-full w-full"
        role="img"
        aria-label="Interactive map of India with destination markers"
      >
        <defs>
          <linearGradient id="landfill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-card)" />
            <stop offset="100%" stopColor="var(--color-primary-soft)" />
          </linearGradient>
        </defs>
        <motion.path
          d={INDIA_PATH}
          fill="url(#landfill)"
          stroke="var(--color-primary)"
          strokeWidth="0.5"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />

        {showRoutes &&
          routeLines.map((r, i) => {
            const a = byId(r.from);
            const b = byId(r.to);
            if (!a || !b) return null;
            return (
              <motion.line
                key={`${r.from}-${r.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--color-teal)"
                strokeWidth="0.45"
                strokeDasharray="1.5 1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.6 + i * 0.18 }}
              />
            );
          })}

        {points.map((d, i) => {
          const on = active === d.id || hover === d.id;
          return (
            <g
              key={d.id}
              transform={`translate(${d.x} ${d.y})`}
              onMouseEnter={() => setHover(d.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect?.(d)}
              className={onSelect ? "cursor-pointer" : undefined}
              tabIndex={onSelect ? 0 : -1}
              role={onSelect ? "button" : undefined}
              aria-label={onSelect ? `Select ${d.name}` : undefined}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect?.(d);
              }}
            >
              <circle
                r={on ? 4.2 : 2.6}
                fill={d.hiddenGem ? "var(--color-amber)" : "var(--color-primary)"}
                fillOpacity={0.18}
                style={{ transition: "r 0.25s ease" }}
              />
              <motion.circle
                r={1.1}
                fill={d.hiddenGem ? "var(--color-amber)" : "var(--color-primary)"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05, type: "spring", stiffness: 260 }}
              />
              {on && (
                <text
                  x={0}
                  y={-4}
                  textAnchor="middle"
                  fontSize="2.6"
                  fill="var(--color-foreground)"
                  fontWeight="600"
                >
                  {d.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
