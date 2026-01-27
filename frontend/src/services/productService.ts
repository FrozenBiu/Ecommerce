import api from "@/lib/axios";

export const productService = {
  getProductList: async (params: {
    keyword: string;
    pageNumber: number;
    minPrice: number;
    maxPrice: number;
    category: string;
    sort: string;
  }) => {
    try {
      const res = await api.get("products/", {
        params: params,
      });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};
