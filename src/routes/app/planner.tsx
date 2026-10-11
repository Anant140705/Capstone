import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/travel/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/planner")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Trip Planner · AI Trip Buddy" },
      {
        name: "description",
        content:
          "Tell the planner your cities, days, budget and interests — the AI builds a day-by-day India itinerary.",
      },
      { property: "og:title", content: "Trip Planner · AI Trip Buddy" },
      {
        property: "og:description",
        content: "A guided multi-step form that turns your preferences into an optimised itinerary.",
      },
    ],
  }),
  component: Planner,
});

const steps = ["Route", "Budget", "Travellers", "Style"] as const;
const interests = [
  "Heritage",
  "Food",
  "Nature",
  "Adventure",
  "Photography",
  "Spiritual",
  "Nightlife",
  "Shopping",
];
const loadingSteps = [
  "Finding destinations…",
  "Optimizing routes…",
  "Searching hotels…",
  "Generating itinerary…",
];

function Planner() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [phase, setPhase] = useState(0);
  const [form, setForm] = useState({
    from: "Delhi",
    to: "Jaipur",
    days: 6,
    budget: [60000],
    transport: "car",
    hotelBudget: "mid",
    travellers: 2,
    luxury: [3],
    picks: ["Heritage", "Food"] as string[],
  });

  useEffect(() => {
    if (!generating) return;
    if (phase >= loadingSteps.length) {
      const t = setTimeout(() => navigate({ to: "/app/itinerary" }), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 1100);
    return () => clearTimeout(t);
  }, [generating, phase, navigate]);

  const toggleInterest = (i: string) =>
    setForm((f) => ({
      ...f,
      picks: f.picks.includes(i) ? f.picks.filter((p) => p !== i) : [...f.picks, i],
    }));

  if (generating) {
    return (
      <div className="grid min-h-[70dvh] place-items-center">
        <div className="surface w-full max-w-md space-y-6 p-8 text-center">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
            className="gradient-primary mx-auto grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground"
          >
            <Sparkles className="h-6 w-6" />
          </motion.span>
          <div>
            <h2 className="text-lg font-semibold">Building your trip</h2>
            <p className="text-sm text-muted-foreground">
              {form.days} days · {form.from} → {form.to}
            </p>
          </div>
          <ul className="space-y-3 text-left">
            {loadingSteps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-sm">
                {i < phase ? (
                  <Check className="h-4 w-4 shrink-0 text-success" />
                ) : i === phase ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
                ) : (
                  <span className="h-4 w-4 shrink-0 rounded-full border border-border" />
                )}
                <span className={i <= phase ? "" : "text-muted-foreground"}>{s}</span>
              </li>
            ))}
          </ul>
          <Progress value={(phase / loadingSteps.length) * 100} className="h-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Plan a new trip"
        description="Four short steps. Everything stays editable after generation."
      />

      <ol className="grid grid-cols-4 gap-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} className="space-y-2">
            <div
              className={cn(
                "h-1.5 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-border",
              )}
            />
            <span
              className={cn(
                "truncate text-xs font-medium",
                i <= step ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="surface p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {step === 0 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="from">Starting city</Label>
                    <Input
                      id="from"
                      value={form.from}
                      onChange={(e) => setForm({ ...form, from: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to">Destination</Label>
                    <Input
                      id="to"
                      value={form.to}
                      onChange={(e) => setForm({ ...form, to: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">Travel days — {form.days}</Label>
                  <Slider
                    id="days"
                    min={1}
                    max={21}
                    step={1}
                    value={[form.days]}
                    onValueChange={([v]) => setForm({ ...form, days: v ?? form.days })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Transportation</Label>
                  <Select
                    value={form.transport}
                    onValueChange={(v) => setForm({ ...form, transport: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Private car</SelectItem>
                      <SelectItem value="train">Train</SelectItem>
                      <SelectItem value="flight">Flights</SelectItem>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label>Total budget — ₹{(form.budget[0] ?? 0).toLocaleString("en-IN")}</Label>
                  <Slider
                    min={10000}
                    max={300000}
                    step={5000}
                    value={form.budget}
                    onValueChange={(v) => setForm({ ...form, budget: v })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hotel budget per night</Label>
                  <Select
                    value={form.hotelBudget}
                    onValueChange={(v) => setForm({ ...form, hotelBudget: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Under ₹2,000</SelectItem>
                      <SelectItem value="mid">₹2,000 – ₹6,000</SelectItem>
                      <SelectItem value="high">₹6,000 – ₹15,000</SelectItem>
                      <SelectItem value="lux">₹15,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="travellers">Travellers — {form.travellers}</Label>
                  <Slider
                    id="travellers"
                    min={1}
                    max={12}
                    step={1}
                    value={[form.travellers]}
                    onValueChange={([v]) => setForm({ ...form, travellers: v ?? form.travellers })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Travel interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((i) => {
                      const on = form.picks.includes(i);
                      return (
                        <button
                          key={i}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleInterest(i)}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                            on
                              ? "border-primary bg-primary-soft text-primary"
                              : "border-border hover:bg-muted",
                          )}
                        >
                          {i}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label>Luxury level — {form.luxury[0] ?? 3} / 5</Label>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={form.luxury}
                    onValueChange={(v) => setForm({ ...form, luxury: v })}
                  />
                  <p className="text-xs text-muted-foreground">
                    1 = hostels and local transport · 5 = heritage suites and private cars
                  </p>
                </div>
                <div className="rounded-xl bg-muted/60 p-4 text-sm">
                  <p className="font-medium">Summary</p>
                  <p className="mt-1 text-muted-foreground">
                    {form.days} days from {form.from} to {form.to} for {form.travellers} travellers,
                    around ₹{(form.budget[0] ?? 0).toLocaleString("en-IN")}.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {form.picks.map((p) => (
                      <Badge key={p} variant="secondary">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>
              Continue <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => setGenerating(true)}>
              <Sparkles className="h-4 w-4" /> Generate itinerary
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
