import { motion } from "motion/react";
import { Star, Clock, CalendarDays, Ticket, Plus, Sparkles } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DestinationCard({
  destination,
  onAdd,
  onOpen,
}: {
  destination: Destination;
  onAdd?: (d: Destination) => void;
  onOpen?: (d: Destination) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="surface hover-lift group overflow-hidden"
    >
      <button
        type="button"
        onClick={() => onOpen?.(destination)}
        className="block w-full text-left"
        aria-label={`Open ${destination.name}`}
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.state}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge className="bg-card text-card-foreground shadow-soft">{destination.category}</Badge>
            {destination.hiddenGem && (
              <Badge className="bg-amber text-amber-foreground">
                <Sparkles className="mr-1 h-3 w-3" /> Hidden gem
              </Badge>
            )}
          </div>
        </div>
      </button>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">{destination.name}</h3>
            <p className="truncate text-sm text-muted-foreground">{destination.state}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium">
            <Star className="h-3.5 w-3.5 fill-amber text-amber" />
            {destination.rating}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">{destination.description}</p>

        <dl className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{destination.bestTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ticket className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{destination.entryFee}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{destination.duration}</span>
          </div>
        </dl>

        {onAdd && (
          <Button size="sm" className="w-full" onClick={() => onAdd(destination)}>
            <Plus className="h-4 w-4" /> Add to trip
          </Button>
        )}
      </div>
    </motion.article>
  );
}
