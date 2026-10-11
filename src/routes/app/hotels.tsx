import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader, EmptyState } from "@/components/travel/PageHeader";
import { HotelCard } from "@/components/travel/HotelCard";
import { IndiaMap } from "@/components/travel/IndiaMap";
import { Button } from "@/components/ui/button";
import { BedDouble } from "lucide-react";
import { hotels } from "@/data/hotels";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/hotels")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Hotels · AI Trip Buddy" },
      {
        name: "description",
        content:
          "Stay recommendations matched to your route and budget — filter by luxury, family, business or couples.",
      },
      { property: "og:title", content: "Hotels · AI Trip Buddy" },
      {
        property: "og:description",
        content: "AI-matched hotel recommendations along your India itinerary.",
      },
    ],
  }),
  component: Hotels,
});

const filters = ["All", "Budget", "Luxury", "Family", "Business", "Couples"] as const;

function Hotels() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const results = useMemo(
    () => (filter === "All" ? hotels : hotels.filter((h) => h.tags.includes(filter))),
    [filter],
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Stays along your route"
        description="Ranked by distance to your planned activities, then by price."
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === f
                ? "border-primary bg-primary-soft text-primary"
                : "border-border hover:bg-muted",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {results.length === 0 ? (
            <div className="sm:col-span-2">
              <EmptyState
                icon={<BedDouble className="h-5 w-5" />}
                title="No stays match that filter"
                description="Try a broader category or widen your nightly budget."
                action={<Button onClick={() => setFilter("All")}>Reset filters</Button>}
              />
            </div>
          ) : (
            results.map((h) => (
              <HotelCard
                key={h.id}
                hotel={h}
                onAdd={(hotel) => toast.success(`${hotel.name} added to your trip`)}
              />
            ))
          )}
        </div>

        <aside className="surface overflow-hidden xl:sticky xl:top-24 xl:self-start">
          <div className="h-64">
            <IndiaMap showRoutes className="rounded-none" />
          </div>
          <div className="p-4">
            <p className="text-sm font-medium">Map preview</p>
            <p className="text-xs text-muted-foreground">
              {results.length} stays across {new Set(results.map((r) => r.city)).size} cities
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
