import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminStore {
  cuttingPrice: number;
  zindaPrice: number;
  cuttingInStock: boolean;
  zindaInStock: boolean;
  cuttingFreshToday: boolean;
  zindaFreshToday: boolean;
  isAdminLoggedIn: boolean;
  isAdminOpen: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  openAdmin: () => void;
  closeAdmin: () => void;
  updateCuttingPrice: (price: number) => void;
  updateZindaPrice: (price: number) => void;
  toggleCuttingStock: () => void;
  toggleZindaStock: () => void;
  toggleCuttingFresh: () => void;
  toggleZindaFresh: () => void;
}

const ADMIN_PASSWORD = "suhel123";

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      cuttingPrice: 220,
      zindaPrice: 150,
      cuttingInStock: true,
      zindaInStock: true,
      cuttingFreshToday: true,
      zindaFreshToday: true,
      isAdminLoggedIn: false,
      isAdminOpen: false,

      login: (password: string) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAdminLoggedIn: true });
          return true;
        }
        return false;
      },

      logout: () => set({ isAdminLoggedIn: false }),

      openAdmin: () => set({ isAdminOpen: true }),

      closeAdmin: () => set({ isAdminOpen: false }),

      updateCuttingPrice: (price: number) =>
        set({ cuttingPrice: Math.max(1, price) }),

      updateZindaPrice: (price: number) =>
        set({ zindaPrice: Math.max(1, price) }),

      toggleCuttingStock: () =>
        set((state) => ({ cuttingInStock: !state.cuttingInStock })),

      toggleZindaStock: () =>
        set((state) => ({ zindaInStock: !state.zindaInStock })),

      toggleCuttingFresh: () =>
        set((state) => ({ cuttingFreshToday: !state.cuttingFreshToday })),

      toggleZindaFresh: () =>
        set((state) => ({ zindaFreshToday: !state.zindaFreshToday })),
    }),
    {
      name: "suhel-admin",
      partialize: (state) => ({
        cuttingPrice: state.cuttingPrice,
        zindaPrice: state.zindaPrice,
        cuttingInStock: state.cuttingInStock,
        zindaInStock: state.zindaInStock,
        cuttingFreshToday: state.cuttingFreshToday,
        zindaFreshToday: state.zindaFreshToday,
      }),
    },
  ),
);
