import api from "@/lib/axios";

export const productService = {
  getProductList: async (
    // keyword: string,
    // pageNumber: number,
    // minPrice: number,
    // maxPrice: number,
    // category: string,
    params: {
      keyword: string;
      pageNumber: number;
      minPrice: number;
      maxPrice: number;
      category: string;
    },
  ) => {
    try {
      const res = await api.get("products/", {
        // params: {
        //   keyword: keyword,
        //   pageNumber: pageNumber,
        //   minPrice: minPrice,
        //   maxPrice: maxPrice,
        //   category: category,
        // },
        params: params,
      });

      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};
