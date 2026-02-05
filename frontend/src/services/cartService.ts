import api from "@/lib/axios";

export const cartService = {
  getCurrentCart: async (userId: string) => {
    try {
      const res = await api.get("/cart", { params: userId });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};
