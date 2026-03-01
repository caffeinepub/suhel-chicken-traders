import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  id: string;
  name: string;
  weightGrams: number;
  pricePerKg: number;
  totalPrice: number;
}

export interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  paymentMethod: "upi";
  timestamp: number;
  status: "pending" | "accepted" | "rejected";
}

interface AdminStore {
  cuttingPrice: number;
  zindaPrice: number;
  cuttingStock: number; // kg quantity (0 = out of stock)
  zindaStock: number; // kg quantity (0 = out of stock)
  cuttingFreshToday: boolean;
  zindaFreshToday: boolean;
  orders: Order[];
  isAdminLoggedIn: boolean;
  isAdminOpen: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  openAdmin: () => void;
  closeAdmin: () => void;
  updateCuttingPrice: (price: number) => void;
  updateZindaPrice: (price: number) => void;
  updateCuttingStock: (qty: number) => void;
  updateZindaStock: (qty: number) => void;
  toggleCuttingFresh: () => void;
  toggleZindaFresh: () => void;
  addOrder: (order: Omit<Order, "orderId" | "timestamp" | "status">) => void;
  updateOrderStatus: (orderId: string, status: "accepted" | "rejected") => void;
}

const ADMIN_PASSWORD = "suhel123";

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      cuttingPrice: 220,
      zindaPrice: 150,
      cuttingStock: 50,
      zindaStock: 30,
      cuttingFreshToday: true,
      zindaFreshToday: true,
      orders: [],
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
      updateCuttingStock: (qty: number) =>
        set({ cuttingStock: Math.max(0, qty) }),
      updateZindaStock: (qty: number) => set({ zindaStock: Math.max(0, qty) }),

      toggleCuttingFresh: () =>
        set((state) => ({ cuttingFreshToday: !state.cuttingFreshToday })),
      toggleZindaFresh: () =>
        set((state) => ({ zindaFreshToday: !state.zindaFreshToday })),

      addOrder: (orderData) => {
        const order: Order = {
          ...orderData,
          orderId: `ORD-${Date.now()}`,
          timestamp: Date.now(),
          status: "pending",
        };
        set((state) => ({ orders: [order, ...state.orders] }));
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.orderId === orderId ? { ...o, status } : o,
          ),
        }));
      },
    }),
    {
      name: "suhel-admin",
      partialize: (state) => ({
        cuttingPrice: state.cuttingPrice,
        zindaPrice: state.zindaPrice,
        cuttingStock: state.cuttingStock,
        zindaStock: state.zindaStock,
        cuttingFreshToday: state.cuttingFreshToday,
        zindaFreshToday: state.zindaFreshToday,
        orders: state.orders,
      }),
    },
  ),
);
