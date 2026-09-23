export interface UserType {
  _id: string;
  name: string;
  email: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  cartItems: { quantity: boolean; product: string[] }[];
}
export interface SignupType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface LoginType {
  email: string;
  password: string;
}
export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  featured: boolean;
  productImg: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateProductType {
  name: string;
  description: string;
  price: number;
  category: string;
  productImg: string;
}
