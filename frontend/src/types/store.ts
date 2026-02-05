import type { User } from "./user";
import type { Product } from "./product";

export type AuthState = {
  accessToken: string | null;
  user: User | null;
  loading: boolean;

  setAccessToken: (accessToken: string) => void;
  clearState: () => void;

  signUp: (
    fullName: string,
    username: string,
    password: string,
  ) => Promise<void>;

  signIn: (username: string, password: string) => Promise<void>;

  signOut: () => Promise<void>;

  fetchMe: () => Promise<void>;

  refresh: () => Promise<void>;
};

export type ProductState = {
  productList: { products: Product[]; page: number; totalPages: number };
  product: Product | null;

  loading: boolean;

  setProductList: (productList: {
    products: Product[];
    page: number;
    totalPages: number;
  }) => void;
  setProduct: (product: Product) => void;

  getProductList: (params: {
    keyword: string;
    pageNumber: number;
    minPrice: number;
    maxPrice: number;
    category: string;
    sort: string;
  }) => Promise<void>;

  getProductDetails: (id: string | undefined) => Promise<void>;
};

export type CartState = {
  productsInCart: [] | null;

  getCurrentCart: () => Promise<void>;

  addProductToCart: () => Promise<void>;

  removeFromCart: () => Promise<void>;
};
