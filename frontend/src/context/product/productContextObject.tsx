import { createContext, useContext } from "react";
import type { CreateProductType, ProductType } from "../../types/types";

import type { UseMutateFunction } from "@tanstack/react-query";

type ProductContextType = {
  categories: string[];
  categoriesLoading: boolean;
  featuredProducts: ProductType[];
  products: ProductType[];
  isAllProductsLoading: boolean;
  createProduct: UseMutateFunction<
    { data: ProductType },
    Error,
    CreateProductType
  >;
  deleteProduct: UseMutateFunction<{ message: string }, Error, string>;
  toggleFeaturedProduct: UseMutateFunction<
    { data: ProductType },
    Error,
    string
  >;
  isCreatingProductPending: boolean;
  isDeletingProductPending: boolean;
  featuredProductsLoading: boolean;
  isTogglingFeaturedProductPending: boolean;
  togglingFeaturedProductId: string | undefined;
  deletingProductId: string | undefined;
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
