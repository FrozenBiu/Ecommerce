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

  getProductDetails: async (id: string | undefined) => {
    try {
      const url = `products/${id}`;
      const res = await api.get(url);

      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  searchProduct: async (keyword: string) => {
    try {
      const res = await api.get("/products", { params: { keyword: keyword } });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};
