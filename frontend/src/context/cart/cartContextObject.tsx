import { createContext, useContext } from "react";
import type { ProductType } from "../../types/types";
interface CartContextType {
  addToCart: (id: string) => void;
  cartDataLoading: boolean;
  cartProducts: ProductType[];
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
export { CartContext };
