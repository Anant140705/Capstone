import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Pencil, Trash2, ExternalLink, Bookmark, Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, EmptyState } from "@/components/travel/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { savedTrips as seed, type SavedTrip } from "@/data/trips";

export const Route = createFileRoute("/app/saved")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Saved Trips · AI Trip Buddy" },
      {
        name: "description",
        content: "All your saved and draft India itineraries — open, edit, duplicate or delete.",
      },
      { property: "og:title", content: "Saved Trips · AI Trip Buddy" },
      { property: "og:description", content: "Your library of AI-generated India itineraries." },
    ],
  }),
  component: Saved,
});

function Saved() {
  const [trips, setTrips] = useState<SavedTrip[]>(seed);

  const duplicate = (t: SavedTrip) => {
    setTrips((all) => [...all, { ...t, id: `${t.id}-copy-${Date.now()}`, status: "Draft" }]);
    toast.success(`Duplicated “${t.title}”`);
  };

  const remove = (id: string) => {
    setTrips((all) => all.filter((t) => t.id !== id));
    toast("Trip deleted");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved trips"
        description={`${trips.length} itineraries in your library`}
        actions={
          <Button asChild>
            <Link to="/app/planner">
              <Plus className="h-4 w-4" /> New trip
            </Link>
          </Button>
        }
      />

      {trips.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="h-5 w-5" />}
          title="Nothing saved yet"
          description="Generate an itinerary and it will show up here."
          action={
            <Button asChild>
              <Link to="/app/planner">Plan a trip</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {trips.map((t) => (
            <motion.article
              key={t.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="surface hover-lift overflow-hidden"
            >
              <div className="relative h-40">
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <Badge className="absolute left-3 top-3 bg-card text-card-foreground shadow-soft">
                  {t.status}
                </Badge>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <h2 className="truncate font-semibold">{t.title}</h2>
                  <p className="truncate text-sm text-muted-foreground">{t.destination}</p>
                </div>
                <dl className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <dt className="sr-only">Dates</dt>
                    <dd>{t.dates}</dd>
                  </div>
                  <div className="text-right">
                    <dt className="sr-only">Budget</dt>
                    <dd className="font-medium text-foreground">
                      ₹{t.budget.toLocaleString("en-IN")}
                    </dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link to="/app/itinerary">
                      <ExternalLink className="h-4 w-4" /> Open
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" aria-label={`Edit ${t.title}`}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    aria-label={`Duplicate ${t.title}`}
                    onClick={() => duplicate(t)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    aria-label={`Delete ${t.title}`}
                    onClick={() => remove(t.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
