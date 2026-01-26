export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  countInStock: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};
