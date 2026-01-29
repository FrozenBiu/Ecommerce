import { productService } from "@/services/productService";
import type { Product } from "@/types/product";
import type { ProductState } from "@/types/store";
import { create } from "zustand";

export const useProductStore = create<ProductState>((set, get) => ({
  productList: {
    products: [],
    page: 1,
    totalPages: 1,
  },
  product: null,
  loading: false,

  setProductList: (productList: {
    products: Product[];
    page: number;
    totalPages: number;
  }) => set({ productList: productList }),
  setProduct: (product: Product) => set({ product: product }),

  getProductList: async (params) => {
    try {
      set({ loading: true });

      const res = await productService.getProductList(params);

      get().setProductList(res);
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  getProductDetails: async (id) => {
    try {
      set({ loading: true });
      const product = await productService.getProductDetails(id);

      get().setProduct(product);
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
