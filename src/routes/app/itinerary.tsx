import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Sun,
  CloudSun,
  Clock,
  Navigation,
  BedDouble,
  Wallet,
  Pencil,
  RefreshCw,
  Download,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/travel/PageHeader";
import { IndiaMap } from "@/components/travel/IndiaMap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { itinerary, budgetBreakdown } from "@/data/trips";

export const Route = createFileRoute("/app/itinerary")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Your Itinerary · GoWander" },
      {
        name: "description",
        content:
          "A day-by-day timeline with morning, afternoon and evening plans, travel time, hotels, weather and cost estimates.",
      },
      { property: "og:title", content: "Your Itinerary · GoWander" },
      {
        property: "og:description",
        content: "AI-generated day-by-day India itinerary with routes, hotels and costs.",
      },
    ],
  }),
  component: Itinerary,
});

const total = itinerary.reduce((a, d) => a + d.cost, 0);

function Itinerary() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Royal Rajasthan Loop"
        description="4 days · Jaipur → Udaipur → Kumbhalgarh · generated 2 hours ago"
        actions={
          <>
            <Button variant="outline" onClick={() => toast("Editing mode is a demo stub")}>
              <Pencil className="h-4 w-4" /> Edit
            </Button>
            <Button variant="outline" onClick={() => toast.success("Regenerating with AI…")}>
              <RefreshCw className="h-4 w-4" /> Regenerate
            </Button>
            <Button variant="outline" onClick={() => toast.success("PDF export queued")}>
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button onClick={() => toast.success("Share link copied")}>
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ol className="relative space-y-5 border-l border-border pl-6">
          {itinerary.map((day, i) => (
            <motion.li
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[31px] top-5 grid h-6 w-6 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {day.day}
              </span>
              <article className="surface overflow-hidden">
                <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-4 sm:flex sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">{day.city}</h2>
                    <p className="text-xs text-muted-foreground">{day.date}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2 text-xs">
                    <Badge variant="secondary">
                      {day.weather === "Sunny" ? (
                        <Sun className="mr-1 h-3 w-3" />
                      ) : (
                        <CloudSun className="mr-1 h-3 w-3" />
                      )}
                      {day.temp}
                    </Badge>
                    <Badge variant="secondary">
                      <Clock className="mr-1 h-3 w-3" /> {day.travelTime}
                    </Badge>
                    <Badge variant="secondary">
                      <Navigation className="mr-1 h-3 w-3" /> {day.distance}
                    </Badge>
                  </div>
                </header>

                <div className="divide-y divide-border">
                  {day.slots.map((slot) => (
                    <div key={slot.time} className="grid gap-1 p-4 sm:grid-cols-[110px_minmax(0,1fr)_auto]">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {slot.time}
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium">{slot.title}</p>
                        <p className="text-sm text-muted-foreground">{slot.detail}</p>
                      </div>
                      <span className="shrink-0 text-sm font-medium">
                        ₹{slot.cost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <footer className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border bg-muted/40 p-4 text-sm sm:flex sm:justify-between">
                  <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
                    <BedDouble className="h-4 w-4 shrink-0" />
                    <span className="truncate">{day.hotel}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 font-semibold">
                    <Wallet className="h-4 w-4" /> ₹{day.cost.toLocaleString("en-IN")}
                  </span>
                </footer>
              </article>
            </motion.li>
          ))}
        </ol>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="surface overflow-hidden">
            <div className="h-48">
              <IndiaMap showRoutes className="rounded-none" />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium">Route preview</p>
              <p className="text-xs text-muted-foreground">712 km total · 9h 05m driving</p>
            </div>
          </div>

          <div className="surface space-y-3 p-5">
            <h2 className="font-semibold">Budget summary</h2>
            <p className="text-3xl font-semibold tracking-tight">
              ₹{total.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">Estimated for 2 travellers</p>
            <div className="space-y-2.5 pt-2">
              {budgetBreakdown.map((b) => (
                <div key={b.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{b.name}</span>
                    <span>₹{b.value.toLocaleString("en-IN")}</span>
                  </div>
                  <Progress
                    value={(b.value / budgetBreakdown[0]!.value) * 100}
                    className="h-1.5"
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
