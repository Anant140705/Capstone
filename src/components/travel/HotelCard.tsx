import { Star, MapPin, Wifi, Plus } from "lucide-react";
import { motion } from "motion/react";
import type { Hotel } from "@/data/hotels";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HotelCard({ hotel, onAdd }: { hotel: Hotel; onAdd?: (h: Hotel) => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface hover-lift group overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={hotel.image}
          alt={`${hotel.name} in ${hotel.city}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute right-3 top-3 bg-card text-card-foreground shadow-soft">
          ₹{hotel.price.toLocaleString("en-IN")} / night
        </Badge>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{hotel.name}</h3>
            <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" /> {hotel.distance}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-amber text-amber" />
            {hotel.rating}
            <span className="text-xs text-muted-foreground">({hotel.reviews})</span>
          </span>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {hotel.amenities.map((a) => (
            <li key={a}>
              <Badge variant="secondary" className="font-normal">
                {a === "Wi-Fi" && <Wifi className="mr-1 h-3 w-3" />}
                {a}
              </Badge>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            View
          </Button>
          <Button size="sm" className="flex-1" onClick={() => onAdd?.(hotel)}>
            <Plus className="h-4 w-4" /> Add to trip
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
