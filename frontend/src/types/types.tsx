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
