export type Product = {
  _id: string;
  name: string;
  image: string;
  images: [];
  description: string;
  category: string;
  price: number;
  countInStock: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};
