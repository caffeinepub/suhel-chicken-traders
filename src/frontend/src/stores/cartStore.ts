import { create } from "zustand";

export interface CartItem {
  id: string; // "cutting" or "zinda"
  name: string;
  weightGrams: number;
  pricePerKg: number;
  totalPrice: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, weightGrams: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) => i.id === item.id && i.weightGrams === item.weightGrams,
      );
      if (existingIndex >= 0) {
        // Replace with updated item
        const updated = [...state.items];
        updated[existingIndex] = item;
        return { items: updated };
      }
      return { items: [...state.items, item] };
    });
  },

  removeItem: (id, weightGrams) => {
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.id === id && i.weightGrams === weightGrams),
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  openCart: () => set({ isOpen: true }),

  closeCart: () => set({ isOpen: false }),

  getTotalItems: () => get().items.length,

  getTotalPrice: () =>
    get().items.reduce((sum, item) => sum + item.totalPrice, 0),
}));
