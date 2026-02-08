import api from "@/lib/axios";

export const cartService = {
  getCurrentCart: async (userId: string | undefined) => {
    try {
      const res = await api.get(`cart/${userId}`);

      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  addToCart: async (
    userId: string | undefined,
    productId: string,
    qty: number,
  ) => {
    try {
      const res = await api.post(`cart/add`, {
        params: { userId, productId, qty },
      });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  updateCart: async (
    userId: string | undefined,
    productId: string,
    qty: number,
  ) => {
    try {
      const res = await api.put(`cart/update`, {
        params: { userId, productId, qty },
      });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  removeFromCart: async (userId: string | undefined, productId: string) => {
    try {
      const res = await api.delete(`cart/remove`, {
        params: { userId, productId },
      });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};
