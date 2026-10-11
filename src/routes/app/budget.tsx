import { createFileRoute } from "@tanstack/react-router";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Lightbulb, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { PageHeader } from "@/components/travel/PageHeader";
import { StatCard } from "@/components/travel/StatCard";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { budgetBreakdown, spendByDay, savingsTips } from "@/data/trips";

export const Route = createFileRoute("/app/budget")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Budget Dashboard · AI Trip Buddy" },
      {
        name: "description",
        content:
          "Expense breakdown, planned versus actual spend, budget health and AI savings suggestions for your trip.",
      },
      { property: "og:title", content: "Budget Dashboard · AI Trip Buddy" },
      {
        property: "og:description",
        content: "Track trip spending across accommodation, transport, food and tickets.",
      },
    ],
  }),
  component: Budget,
});

const total = budgetBreakdown.reduce((a, b) => a + b.value, 0);
const spent = spendByDay.reduce((a, b) => a + b.actual, 0);

function Budget() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Budget dashboard"
        description="Where the money goes, and where the AI thinks you can claw some back."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Planned budget" value={total} prefix="₹" icon={<Wallet className="h-4.5 w-4.5" />} />
        <StatCard label="Spent so far" value={spent} prefix="₹" icon={<TrendingDown className="h-4.5 w-4.5" />} />
        <StatCard
          label="Projected savings"
          value={4300}
          prefix="₹"
          icon={<PiggyBank className="h-4.5 w-4.5" />}
          hint="If you apply 2 suggestions"
        />
        <StatCard label="Daily average" value={Math.round(spent / spendByDay.length)} prefix="₹" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="surface p-5">
          <h2 className="font-semibold">Expense breakdown</h2>
          <div className="mt-2 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                >
                  {budgetBreakdown.map((b) => (
                    <Cell key={b.name} fill={b.color} stroke="var(--color-card)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface p-5">
          <h2 className="font-semibold">Planned vs actual</h2>
          <div className="mt-2 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendByDay} margin={{ left: -18, right: 6, top: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="planned" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="actual" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="surface space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Budget health</h2>
            <Badge className="bg-success text-success-foreground">On track</Badge>
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Used</span>
              <span className="font-medium">
                ₹{spent.toLocaleString("en-IN")} of ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
            <Progress value={(spent / total) * 100} className="mt-2 h-2.5" />
          </div>
          <ul className="space-y-3 pt-1">
            {budgetBreakdown.map((b) => (
              <li key={b.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{b.name}</span>
                  <span>{Math.round((b.value / total) * 100)}%</span>
                </div>
                <Progress value={(b.value / total) * 100} className="h-1.5" />
              </li>
            ))}
          </ul>
        </section>

        <section className="surface space-y-3 p-5">
          <h2 className="font-semibold">Savings suggestions</h2>
          <ul className="space-y-3">
            {savingsTips.map((t) => (
              <li key={t} className="flex gap-3 rounded-xl bg-muted/60 p-3 text-sm">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
