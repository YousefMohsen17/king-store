import { useQuery } from "@tanstack/react-query";
import { getCategories, getFeaturedProducts } from "../../lib/api";
import { ProductContext } from "./productContextObject";
export function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <span className="loading loading-spinner loading-lg"></span>
  //     </div>
  //   );
  // }
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const {
    data: featuredProductsData = [],
    isLoading: featuredProductsLoading,
  } = useQuery({
    queryKey: ["products", "featuredProducts"],
    queryFn: getFeaturedProducts,
  });

  return (
    <ProductContext.Provider
      value={{
        categories: categoriesData?.data ?? [],
        categoriesLoading,
        featuredProducts: featuredProductsData?.data ?? [],
        featuredProductsLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
