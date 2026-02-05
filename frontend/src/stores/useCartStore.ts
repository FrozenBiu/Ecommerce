import type { CartState } from "@/types/store";
import { create } from "zustand";

const useCartStore = create<CartState>((set, get) => ({
  productsInCart: null,

  getCurrentCart: async () => {},

  addProductToCart: async () => {},

  removeFromCart: async () => {},
}));
