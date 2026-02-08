import { cartService } from "@/services/cartService";
import type { CartState } from "@/types/store";
import { create } from "zustand";

const useCartStore = create<CartState>((set) => ({
  loading: false,
  cart: null,

  getCurrentCart: async (userId) => {
    try {
      set({ loading: true });
      const cart = await cartService.getCurrentCart(userId);
      set({ cart });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  addProductToCart: async (userId, productId, qty) => {
    try {
      set({ loading: true });
      const cart = await cartService.addToCart(userId, productId, qty);
      set({ cart });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  updateCart: async (userId, productId, qty) => {
    try {
      set({ loading: true });
      const cart = await cartService.updateCart(userId, productId, qty);
      set({ cart });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  removeFromCart: async (userId, productId) => {
    try {
      set({ loading: true });
      const cart = await cartService.removeFromCart(userId, productId);
      set({ cart });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCartStore;
