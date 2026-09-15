import { createContext, useContext } from "react";
import type { ProductType } from "../../types/types";

type ProductContextType = {
  categories: string[];
  categoriesLoading: boolean;
  featuredProducts: ProductType[];
  featuredProductsLoading: boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within an AuthContextProvider");
  }
  return context;
}

export { ProductContext };
