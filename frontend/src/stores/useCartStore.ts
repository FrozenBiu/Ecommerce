import { cartService } from "@/services/cartService";
import type { CartState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

const useCartStore = create<CartState>((set, get) => ({
  loading: false,
  cart: null,

  getCurrentCart: async (userId) => {
    try {
      set({ loading: true });
      const cart = await cartService.getCurrentCart(userId);
      set({ cart });
      // console.log(cart);
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

      get().getCurrentCart(userId);
      toast.success("Thêm sản phẩm thành công!");
      set({ cart });
    } catch (error) {
      console.error(error);
      toast.error("Thêm sản phẩm thất bại. Hãy thử lại!");
    } finally {
      set({ loading: false });
    }
  },

  updateCart: async (userId, productId, qty) => {
    try {
      set({ loading: true });
      const cart = await cartService.updateCart(userId, productId, qty);

      get().getCurrentCart(userId);

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

      get().getCurrentCart(userId);

      set({ cart });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  removeAllFromCart: async (userId) => {
    try {
      set({ loading: true });
      const cart = await cartService.removeAllFromCart(userId);

      get().getCurrentCart(userId);

      set({ cart });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCartStore;
