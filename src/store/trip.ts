import { create } from "zustand";
import type { Destination } from "@/data/destinations";

type TripState = {
  selected: Destination[];
  add: (d: Destination) => void;
  remove: (id: string) => void;
};

export const useTripStore = create<TripState>((set) => ({
  selected: [],
  add: (d) =>
    set((s) => (s.selected.some((x) => x.id === d.id) ? s : { selected: [...s.selected, d] })),
  remove: (id) => set((s) => ({ selected: s.selected.filter((x) => x.id !== id) })),
}));
