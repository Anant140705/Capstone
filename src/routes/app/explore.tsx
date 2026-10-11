import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, Sparkles, Star, X, Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/travel/PageHeader";
import { DestinationCard } from "@/components/travel/DestinationCard";
import { IndiaMap } from "@/components/travel/IndiaMap";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { destinations, states, categories, type Destination } from "@/data/destinations";
import { useTripStore } from "@/store/trip";

export const Route = createFileRoute("/app/explore")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Explore India · AI Trip Buddy" },
      {
        name: "description",
        content:
          "Browse an interactive map of India, filter destinations by state, category, budget and duration, and add them to your trip.",
      },
      { property: "og:title", content: "Explore India · AI Trip Buddy" },
      {
        property: "og:description",
        content: "An interactive destination explorer for planning trips across India.",
      },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const [category, setCategory] = useState("all");
  const [budget, setBudget] = useState("all");
  const [duration, setDuration] = useState("all");
  const [active, setActive] = useState<Destination | null>(null);
  const add = useTripStore((s) => s.add);

  const results = useMemo(
    () =>
      destinations.filter((d) => {
        const q = query.trim().toLowerCase();
        const days = parseInt(d.duration, 10) || 1;
        return (
          (!q || d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)) &&
          (state === "all" || d.state === state) &&
          (category === "all" || d.category === category) &&
          (budget === "all" || d.budgetBand === budget) &&
          (duration === "all" ||
            (duration === "short" && days <= 2) ||
            (duration === "mid" && days > 2 && days <= 5) ||
            (duration === "long" && days > 5))
        );
      }),
    [query, state, category, budget, duration],
  );

  const onAdd = (d: Destination) => {
    add(d);
    toast.success(`${d.name} added to your trip`);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Explore India"
        description="Pan the map, filter by what you actually care about, and build a shortlist."
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="relative h-[420px] xl:sticky xl:top-24 xl:h-[calc(100dvh-140px)]">
          <div className="surface h-full overflow-hidden p-2">
            <IndiaMap active={active?.id ?? null} onSelect={setActive} />
          </div>

          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="surface absolute bottom-4 left-4 right-4 flex gap-4 p-4"
              >
                <img
                  src={active.image}
                  alt={active.name}
                  className="h-24 w-24 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">{active.name}</h3>
                      <p className="truncate text-xs text-muted-foreground">{active.state}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Close destination details"
                      onClick={() => setActive(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{active.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 font-medium">
                      <Star className="h-3.5 w-3.5 fill-amber text-amber" /> {active.rating}
                    </span>
                    <Badge variant="secondary">{active.bestTime}</Badge>
                    <Badge variant="secondary">{active.entryFee}</Badge>
                    <Badge variant="secondary">{active.duration}</Badge>
                  </div>
                  <Button size="sm" className="mt-1" onClick={() => onAdd(active)}>
                    <Plus className="h-4 w-4" /> Add to trip
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!active && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="surface absolute bottom-4 right-4 max-w-[260px] space-y-1.5 p-4"
            >
              <span className="flex items-center gap-2 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> AI recommendation
              </span>
              <p className="text-sm">
                Pair <strong>Hampi</strong> with <strong>Goa</strong> — a 5-hour drive links ruins
                and coastline in one 6-day loop.
              </p>
            </motion.aside>
          )}
        </div>

        <div className="space-y-4">
          <div className="surface space-y-3 p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations or states"
                aria-label="Search destinations"
                className="pl-9"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              <Select value={state} onValueChange={setState}>
                <SelectTrigger aria-label="Filter by state">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All states</SelectItem>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger aria-label="Filter by category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger aria-label="Filter by budget">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any budget</SelectItem>
                  <SelectItem value="Budget">Budget</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger aria-label="Filter by duration">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any length</SelectItem>
                  <SelectItem value="short">1–2 days</SelectItem>
                  <SelectItem value="mid">3–5 days</SelectItem>
                  <SelectItem value="long">6+ days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">{results.length} destinations match</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((d) => (
              <DestinationCard key={d.id} destination={d} onAdd={onAdd} onOpen={setActive} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
