import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Wallet,
  MapPinned,
  Plane,
  Sparkles,
  ArrowRight,
  Compass,
  MessageSquare,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { PageHeader } from "@/components/travel/PageHeader";
import { StatCard } from "@/components/travel/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { savedTrips, monthlyTravel, recentConversations, budgetBreakdown } from "@/data/trips";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Dashboard · AI Trip Buddy" },
      {
        name: "description",
        content:
          "Your travel dashboard: upcoming trips, budget health, AI conversations and travel analytics in one place.",
      },
      { property: "og:title", content: "Dashboard · AI Trip Buddy" },
      {
        property: "og:description",
        content: "Track upcoming trips, budgets and AI-generated itineraries across India.",
      },
    ],
  }),
  component: Dashboard,
});

const totalBudget = budgetBreakdown.reduce((a, b) => a + b.value, 0);

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome back, Aarav"
        description="Two trips in motion. Your Rajasthan loop departs in 12 days."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/app/explore">
                <Compass className="h-4 w-4" /> Explore map
              </Link>
            </Button>
            <Button asChild>
              <Link to="/app/planner">
                <Sparkles className="h-4 w-4" /> Generate trip
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Upcoming trips" value={2} icon={<Plane className="h-4.5 w-4.5" />} hint="Next: 12 Nov" />
        <StatCard
          label="Planned budget"
          value={totalBudget}
          prefix="₹"
          icon={<Wallet className="h-4.5 w-4.5" />}
          hint="Across all active trips"
        />
        <StatCard label="Destinations saved" value={18} icon={<MapPinned className="h-4.5 w-4.5" />} hint="6 hidden gems" />
        <StatCard label="AI itineraries" value={24} icon={<Sparkles className="h-4.5 w-4.5" />} hint="12 left this month" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface p-5 lg:col-span-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold">Travel analytics</h2>
            <Badge variant="secondary">Last 8 months</Badge>
          </div>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTravel} margin={{ left: -18, right: 6, top: 8 }}>
                <defs>
                  <linearGradient id="km" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="km"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  fill="url(#km)"
                  name="Kilometres travelled"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="surface space-y-4 p-5"
        >
          <h2 className="text-base font-semibold">Budget health</h2>
          {budgetBreakdown.map((b) => (
            <div key={b.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{b.name}</span>
                <span className="font-medium">₹{b.value.toLocaleString("en-IN")}</span>
              </div>
              <Progress value={(b.value / totalBudget) * 100} className="h-2" />
            </div>
          ))}
          <Button asChild variant="outline" className="w-full">
            <Link to="/app/budget">
              Open budget dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Your trips</h2>
            <Link to="/app/saved" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {savedTrips.slice(0, 4).map((t) => (
              <motion.article
                key={t.id}
                whileHover={{ y: -3 }}
                className="surface flex gap-3 overflow-hidden p-3"
              >
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold">{t.title}</h3>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{t.destination}</p>
                  <p className="text-xs text-muted-foreground">{t.dates}</p>
                  <Badge variant="secondary">{t.status}</Badge>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="surface space-y-3 p-5">
          <h2 className="text-base font-semibold">Recent AI conversations</h2>
          <ul className="space-y-3">
            {recentConversations.map((c) => (
              <li key={c.id} className="flex gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.snippet}</p>
                  <p className="text-xs text-muted-foreground/70">{c.when}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button asChild className="w-full">
            <Link to="/app/assistant">
              <Sparkles className="h-4 w-4" /> Open AI assistant
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
