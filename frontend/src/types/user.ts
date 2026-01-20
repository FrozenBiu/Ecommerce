export type User = {
  _id: string;
  fullName: string;
  username: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
