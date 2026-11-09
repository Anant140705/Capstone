import {
  Compass,
  Landmark,
  MapPin,
  Mountain,
  Search,
  Sparkles,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, type Destination } from "@/data/destinations";
import { cn } from "@/lib/utils";

export type MapCoordinates = {
  lat: number;
  lng: number;
};

export type MapPlace = Pick<Destination, "id" | "name" | "category" | "description"> & {
  coordinates: MapCoordinates;
  state?: string;
  image?: string;
};

export type RouteResult = {
  distance: number;
  duration: number;
  geometry: [number, number][];
};

export type InteractiveMapProps = {
  places?: MapPlace[];
  center?: MapCoordinates;
  zoom?: number;
  height?: string | number;
  showSearch?: boolean;
  showFilters?: boolean;
  showRouting?: boolean;
  showPopups?: boolean;
  searchQuery?: string;
  selectedCategories?: string[];
  selectedPlaces?: MapPlace[];
  onMarkerClick?: (place: MapPlace) => void;
  onPlaceSelect?: (place: MapPlace) => void;
  onRouteChange?: (route: RouteResult | null) => void;
  className?: string;
};

const INDIA_BOUNDS = { minLat: 6, maxLat: 36, minLng: 68, maxLng: 98 };
const DEFAULT_CENTER = { lat: 22.5, lng: 79 };
const DEFAULT_ZOOM = 4;
const MAX_ZOOM = 18;
const ZOOM_STEP = 0.5;
const TILE_SIZE = 256;
const EMPTY_CATEGORIES: string[] = [];

const categoryIcons: Record<string, LucideIcon> = {
  Heritage: Landmark,
  Beach: Waves,
  Mountain,
  Spiritual: Sparkles,
  Wildlife: Compass,
  City: MapPin,
};

function clampCoordinates(coordinates: MapCoordinates): MapCoordinates {
  return {
    lat: Math.min(INDIA_BOUNDS.maxLat, Math.max(INDIA_BOUNDS.minLat, coordinates.lat)),
    lng: Math.min(INDIA_BOUNDS.maxLng, Math.max(INDIA_BOUNDS.minLng, coordinates.lng)),
  };
}

function unproject(x: number, y: number, zoom: number): MapCoordinates {
  const scale = TILE_SIZE * 2 ** zoom;
  return {
    lng: (x / scale) * 360 - 180,
    lat: (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / scale))) * 180) / Math.PI,
  };
}

function project({ lat, lng }: MapCoordinates, zoom: number) {
  const scale = TILE_SIZE * 2 ** zoom;
  const safeLat = Math.max(-85.0511, Math.min(85.0511, lat));
  return {
    x: ((lng + 180) / 360) * scale,
    y:
      (0.5 -
        Math.log(
          (1 + Math.sin((safeLat * Math.PI) / 180)) / (1 - Math.sin((safeLat * Math.PI) / 180)),
        ) /
          (4 * Math.PI)) *
      scale,
  };
}

function placeCoordinates(place: MapPlace): MapCoordinates {
  return place.coordinates;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

export function InteractiveMap({
  places = [],
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  height = "100%",
  showSearch = false,
  showFilters = false,
  showRouting = false,
  showPopups = true,
  searchQuery,
  selectedCategories = EMPTY_CATEGORIES,
  selectedPlaces = [],
  onMarkerClick,
  onPlaceSelect,
  onRouteChange,
  className,
}: InteractiveMapProps) {
  const [mapCenter, setMapCenter] = useState(() => clampCoordinates(center));
  const [mapZoom, setMapZoom] = useState(Math.max(3, Math.min(MAX_ZOOM, zoom)));
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState(selectedCategories);
  const [activePlace, setActivePlace] = useState<MapPlace | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchedLocation, setSearchedLocation] = useState<MapCoordinates | null>(null);
  const [searchedPlaces, setSearchedPlaces] = useState<MapPlace[]>([]);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    center: MapCoordinates;
  } | null>(null);
  const dragFrameRef = useRef<number | null>(null);
  const pendingDragOffsetRef = useRef({ x: 0, y: 0 });
  const selectedPlaceCount = selectedPlaces.length;
  const selectedPlaceCoordinates = useMemo(
    () => selectedPlaces.map(placeCoordinates),
    [selectedPlaces],
  );

  useEffect(() => setActiveCategories(selectedCategories), [selectedCategories]);
  useEffect(() => setMapCenter(clampCoordinates(center)), [center]);
  useEffect(() => {
    const normalizedQuery = searchQuery?.trim().toLowerCase();
    if (!normalizedQuery) {
      setSearchedLocation(null);
      return;
    }

    const matchingPlace = places.find(
      (place) =>
        place.name.toLowerCase().includes(normalizedQuery) ||
        place.description.toLowerCase().includes(normalizedQuery) ||
        place.state?.toLowerCase().includes(normalizedQuery),
    );
    if (!matchingPlace) return;

    const location = clampCoordinates(placeCoordinates(matchingPlace));
    setMapCenter(location);
    setSearchedLocation(location);
    setMapZoom(9);
  }, [places, searchQuery]);

  const visiblePlaces = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const allPlaces = [...places, ...searchedPlaces].filter(
      (place, index, collection) =>
        collection.findIndex((candidate) => candidate.id === place.id) === index,
    );
    return allPlaces.filter((place) => {
      const matchesCategory =
        activeCategories.length === 0 || activeCategories.includes(place.category);
      const matchesQuery =
        !normalizedQuery ||
        place.name.toLowerCase().includes(normalizedQuery) ||
        place.description.toLowerCase().includes(normalizedQuery) ||
        place.state?.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategories, places, query, searchedPlaces]);

  const projectedCenter = project(mapCenter, mapZoom);
  const tileZoom = Math.floor(mapZoom);
  const tileScale = 2 ** (mapZoom - tileZoom);
  const renderedTileSize = TILE_SIZE * tileScale;
  const tileCenter = project(mapCenter, tileZoom);
  const tiles = useMemo(() => {
    const tileX = Math.floor(tileCenter.x / TILE_SIZE);
    const tileY = Math.floor(tileCenter.y / TILE_SIZE);
    return Array.from({ length: 25 }, (_, index) => {
      const offsetX = (index % 5) - 2;
      const x = tileX + offsetX;
      const y = tileY + Math.floor(index / 5) - 2;
      const max = 2 ** tileZoom;
      return {
        x: ((x % max) + max) % max,
        y,
        left: (x * TILE_SIZE - tileCenter.x) * tileScale,
        top: (y * TILE_SIZE - tileCenter.y) * tileScale,
        key: `${x}-${y}`,
      };
    }).filter((tile) => tile.y >= 0 && tile.y < 2 ** tileZoom);
  }, [tileCenter.x, tileCenter.y, tileZoom, tileScale]);

  const toggleCategory = (category: string) => {
    setActiveCategories((current) =>
      current.includes(category)
        ? current.filter((value) => value !== category)
        : [...current, category],
    );
  };

  const selectPlace = (place: MapPlace) => {
    setActivePlace(showPopups ? place : null);
    onMarkerClick?.(place);
    onPlaceSelect?.(place);
  };

  const searchLocation = async () => {
    const value = query.trim();
    if (!value) return;
    setSearching(true);
    setSearchError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=in&q=${encodeURIComponent(value)}`,
        { headers: { Accept: "application/json" } },
      );
      if (!response.ok) throw new Error("Location search failed");
      const results = (await response.json()) as Array<{
        lat: string;
        lon: string;
        display_name?: string;
        boundingbox?: [string, string, string, string];
      }>;
      const result = results[0];
      if (!result) {
        setSearchError("No Indian location found");
        return;
      }
      const location = clampCoordinates({ lat: Number(result.lat), lng: Number(result.lon) });
      setMapCenter(location);
      setSearchedLocation(location);
      setSearchedPlaces([]);

      const boundingBox = result.boundingbox?.map(Number);
      const south =
        boundingBox?.length === 4 && boundingBox.every(Number.isFinite)
          ? (boundingBox[0] ?? location.lat - 0.3)
          : location.lat - 0.3;
      const north =
        boundingBox?.length === 4 && boundingBox.every(Number.isFinite)
          ? (boundingBox[1] ?? location.lat + 0.3)
          : location.lat + 0.3;
      const west =
        boundingBox?.length === 4 && boundingBox.every(Number.isFinite)
          ? (boundingBox[2] ?? location.lng - 0.3)
          : location.lng - 0.3;
      const east =
        boundingBox?.length === 4 && boundingBox.every(Number.isFinite)
          ? (boundingBox[3] ?? location.lng + 0.3)
          : location.lng + 0.3;
      const latitudeSpan = Math.min(3, Math.max(0.01, Math.abs(north - south)));
      const longitudeSpan = Math.min(3, Math.max(0.01, Math.abs(east - west)));
      const attractionSouth = Math.max(INDIA_BOUNDS.minLat, location.lat - latitudeSpan / 2);
      const attractionNorth = Math.min(INDIA_BOUNDS.maxLat, location.lat + latitudeSpan / 2);
      const attractionWest = Math.max(INDIA_BOUNDS.minLng, location.lng - longitudeSpan / 2);
      const attractionEast = Math.min(INDIA_BOUNDS.maxLng, location.lng + longitudeSpan / 2);
      const overpassQuery = `[out:json][timeout:20];(nwr["tourism"~"attraction|museum|gallery|viewpoint|zoo|theme_park|aquarium"](${attractionSouth},${attractionWest},${attractionNorth},${attractionEast});nwr["historic"~"monument|castle|archaeological_site|ruins"](${attractionSouth},${attractionWest},${attractionNorth},${attractionEast}););out center tags;`;

      const attractionResponse = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(overpassQuery)}`,
      });
      if (attractionResponse.ok) {
        const attractionData = (await attractionResponse.json()) as {
          elements?: Array<{
            id: number;
            type: string;
            lat?: number;
            lon?: number;
            center?: { lat: number; lon: number };
            tags?: { name?: string; tourism?: string; historic?: string; description?: string };
          }>;
        };
        const attractions = (attractionData.elements ?? [])
          .filter(
            (element) =>
              element.tags?.name &&
              (element.center !== undefined ||
                (element.lat !== undefined && element.lon !== undefined)),
          )
          .map((element): MapPlace => {
            const coordinates = element.center ?? { lat: element.lat!, lon: element.lon! };
            const category =
              element.tags?.tourism === "viewpoint"
                ? "Mountain"
                : element.tags?.historic
                  ? "Heritage"
                  : "City";
            return {
              id: `osm-${element.type}-${element.id}`,
              name: element.tags!.name!,
              category,
              coordinates: { lat: coordinates.lat, lng: coordinates.lon },
              description:
                element.tags!.description ??
                `Tourist attraction near ${result.display_name ?? value}`,
            };
          });
        setSearchedPlaces(attractions);
      }

      if (boundingBox?.length === 4 && boundingBox.every(Number.isFinite)) {
        const largestSpan = Math.max(Math.abs(north - south), Math.abs(east - west));
        const fittedZoom = Math.floor(Math.log2(360 / largestSpan)) - 1;
        setMapZoom(Math.max(3, Math.min(MAX_ZOOM, fittedZoom)));
      } else {
        setMapZoom(Math.max(mapZoom, 7));
      }
    } catch {
      setSearchError("Unable to search right now");
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (!showRouting || selectedPlaceCount < 2) {
      setRoute(null);
      onRouteChange?.(null);
      return;
    }
    const points = selectedPlaceCoordinates;
    const controller = new AbortController();
    setRouteLoading(true);
    setRouteError(null);
    fetch(
      `https://router.project-osrm.org/route/v1/driving/${points.map((point) => `${point.lng},${point.lat}`).join(";")}?overview=full&geometries=geojson`,
      { signal: controller.signal },
    )
      .then(async (response) => {
        if (!response.ok) throw new Error("Route calculation failed");
        const data = (await response.json()) as {
          routes?: Array<{
            distance: number;
            duration: number;
            geometry: { coordinates: [number, number][] };
          }>;
        };
        const result = data.routes?.[0];
        if (!result) throw new Error("No route found");
        const nextRoute = {
          distance: result.distance,
          duration: result.duration,
          geometry: result.geometry.coordinates,
        };
        setRoute(nextRoute);
        onRouteChange?.(nextRoute);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setRouteError("Unable to calculate this route");
        onRouteChange?.(null);
      })
      .finally(() => setRouteLoading(false));
    return () => controller.abort();
  }, [onRouteChange, selectedPlaceCoordinates, selectedPlaceCount, showRouting]);

  const startDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      center: mapCenter,
    };
    pendingDragOffsetRef.current = { x: 0, y: 0 };
    setDragOffset({ x: 0, y: 0 });
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const dragMap = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    pendingDragOffsetRef.current = {
      x: event.clientX - drag.startX,
      y: event.clientY - drag.startY,
    };
    if (dragFrameRef.current !== null) return;
    dragFrameRef.current = requestAnimationFrame(() => {
      setDragOffset(pendingDragOffsetRef.current);
      dragFrameRef.current = null;
    });
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId !== event.pointerId) return;
    const offset = {
      x: event.clientX - drag.startX,
      y: event.clientY - drag.startY,
    };
    const start = project(drag.center, mapZoom);
    setMapCenter(clampCoordinates(unproject(start.x - offset.x, start.y - offset.y, mapZoom)));
    if (dragFrameRef.current !== null) {
      cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
    }
    dragRef.current = null;
    pendingDragOffsetRef.current = { x: 0, y: 0 };
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-2xl bg-[#dbe7e5]", className)}
      style={{ height }}
      role="application"
      aria-label="Interactive map of India"
    >
      <div
        className={cn(
          "absolute inset-0 overflow-hidden touch-none cursor-grab",
          isDragging && "cursor-grabbing",
        )}
        onPointerDown={startDragging}
        onPointerMove={dragMap}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`,
            willChange: isDragging ? "transform" : undefined,
          }}
        >
          <div
            className="absolute"
            style={{
              width: TILE_SIZE,
              height: TILE_SIZE,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {tiles.map((tile) => (
              <img
                key={tile.key}
                src={`https://tile.openstreetmap.org/${tileZoom}/${tile.x}/${tile.y}.png`}
                alt=""
                className="absolute max-w-none"
                style={{
                  width: renderedTileSize,
                  height: renderedTileSize,
                  left: `calc(50% + ${tile.left}px)`,
                  top: `calc(50% + ${tile.top}px)`,
                  filter: "contrast(1.3) brightness(0.9) saturate(0.85)",
                }}
                loading="lazy"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-white/25" />
          {visiblePlaces.map((place) => {
            const point = project(placeCoordinates(place), mapZoom);
            const left = `calc(50% + ${point.x - projectedCenter.x}px)`;
            const top = `calc(50% + ${point.y - projectedCenter.y}px)`;
            const Icon = categoryIcons[place.category] ?? MapPin;
            return (
              <button
                key={place.id}
                type="button"
                className="absolute -translate-x-1/2 -translate-y-full rounded-full bg-primary p-2.5 text-primary-foreground shadow-lg transition-transform hover:scale-110"
                style={{ left, top }}
                aria-label={`View ${place.name}`}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => selectPlace(place)}
              >
                <Icon className="h-5 w-5" />
              </button>
            );
          })}
          {searchedLocation && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + ${project(searchedLocation, mapZoom).x - projectedCenter.x}px)`,
                top: `calc(50% + ${project(searchedLocation, mapZoom).y - projectedCenter.y}px)`,
              }}
              aria-label={`Search result for ${query}`}
            >
              <span className="block h-5 w-5 animate-ping rounded-full bg-primary/50" />
              <span className="absolute inset-1 block rounded-full border-2 border-white bg-primary shadow-lg" />
            </div>
          )}
          {route && (
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline
                points={route.geometry
                  .map(([lng, lat]) => {
                    return `${((lng - INDIA_BOUNDS.minLng) / (INDIA_BOUNDS.maxLng - INDIA_BOUNDS.minLng)) * 100},${((INDIA_BOUNDS.maxLat - lat) / (INDIA_BOUNDS.maxLat - INDIA_BOUNDS.minLat)) * 100}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="var(--primary)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}
          {route && (
            <div className="absolute left-3 bottom-3 rounded-lg bg-card/95 px-3 py-2 text-xs shadow">
              {route.distance >= 1000
                ? `${(route.distance / 1000).toFixed(0)} km`
                : `${Math.round(route.distance)} m`}{" "}
              · {formatDuration(route.duration)}
            </div>
          )}
        </div>
      </div>

      <div className="absolute left-3 right-3 top-3 flex flex-wrap items-start justify-between gap-2">
        {showSearch && (
          <form
            className="flex max-w-sm flex-1 gap-1 rounded-lg bg-card/95 p-1 shadow"
            onPointerDown={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              void searchLocation();
            }}
          >
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search India"
              aria-label="Search locations in India"
              className="h-8 border-0 bg-transparent text-xs shadow-none"
              onPointerDown={(event) => event.stopPropagation()}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              disabled={searching}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        )}
        <div className="ml-auto flex gap-1 rounded-lg bg-card/95 p-1 shadow">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => setMapZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP))}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label="Zoom in"
          >
            +
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => setMapZoom((value) => Math.max(3, value - ZOOM_STEP))}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label="Zoom out"
          >
            −
          </Button>
        </div>
      </div>

      {showFilters && (
        <div
          className="absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1 rounded-lg bg-card/95 p-2 shadow"
          onPointerDown={(event) => event.stopPropagation()}
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={cn(
                "rounded-full px-2 py-1 text-[10px]",
                activeCategories.length === 0 || activeCategories.includes(category)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
              aria-pressed={activeCategories.includes(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {(searchError || routeError || routeLoading) && (
        <p className="absolute right-3 bottom-3 rounded bg-card/95 px-2 py-1 text-xs text-muted-foreground shadow">
          {searchError ?? routeError ?? "Calculating route…"}
        </p>
      )}

      {activePlace && (
        <div
          className="absolute right-3 top-16 w-64 rounded-xl bg-card/95 p-3 shadow-xl"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="flex items-start gap-2">
            {activePlace.image && (
              <img src={activePlace.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{activePlace.name}</p>
              <p className="text-xs text-muted-foreground">{activePlace.category}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setActivePlace(null)}
              aria-label="Close popup"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{activePlace.description}</p>
        </div>
      )}
    </div>
  );
}
