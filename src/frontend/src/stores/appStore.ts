import { create } from "zustand";
import type { CartItem } from "./cartStore";

interface OrderData {
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
}

interface AppStore {
  showCheckout: boolean;
  showConfirmation: boolean;
  lastOrder: OrderData | null;
  openCheckout: () => void;
  closeCheckout: () => void;
  showOrderConfirmation: (order: OrderData) => void;
  resetOrder: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  showCheckout: false,
  showConfirmation: false,
  lastOrder: null,

  openCheckout: () => set({ showCheckout: true }),

  closeCheckout: () => set({ showCheckout: false }),

  showOrderConfirmation: (order: OrderData) =>
    set({
      showCheckout: false,
      showConfirmation: true,
      lastOrder: order,
    }),

  resetOrder: () =>
    set({
      showCheckout: false,
      showConfirmation: false,
      lastOrder: null,
    }),
}));
