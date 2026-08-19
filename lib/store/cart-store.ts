"use client";

import { create } from "zustand";
import type { Oeuvre } from "@/lib/types";

interface CartState {
  items: Oeuvre[];
  isCartOpen: boolean;
  addItem: (oeuvre: Oeuvre) => void;
  removeItem: (oeuvreId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isCartOpen: false,
  addItem: (oeuvre) =>
    set((state) => ({
      items: state.items.some((i) => i.id === oeuvre.id)
        ? state.items
        : [...state.items, oeuvre],
    })),
  removeItem: (oeuvreId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== oeuvreId),
    })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  clearCart: () => set({ items: [] }),
}));