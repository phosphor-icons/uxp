import Fuse from "fuse.js";
import create from "zustand";

import { IconStyle } from "../lib";
import { icons } from "../lib/icons";

const fuse = new Fuse(icons, {
  keys: [{ name: "name", weight: 4 }, "tags", "categories"],
  threshold: 0.2, // Tweak this to what feels like the right number of results
  // shouldSort: false,
  useExtendedSearch: true,
});

export const useIconWeight = create((set) => ({
  weight: IconStyle.REGULAR,
  setWeight: (weight) => set({ weight }),
}));

export const useIconSearch = create((set) => ({
  query: "",
  results: icons,
  search: (query) => {
    if (!query) {
      set({ query: "", results: icons });
      return;
    }

    set({
      query,
      results: fuse.search(query).map((value) => value.item),
    });
  },
}));

export const useIconSelections = create((set) => ({
  pending: [],
  addPending: (name, url) => {
    if (!name || !url) return;
    set(({ pending }) => ({ pending: [...pending, { name, url }] }));
  },
  removePending: (name) => {
    if (!name) return;
    set(({ pending }) => ({
      pending: pending.filter((icon) => icon.name !== name),
    }));
  },
  clearPending: () => {
    set({ pending: [] });
  },
}));
