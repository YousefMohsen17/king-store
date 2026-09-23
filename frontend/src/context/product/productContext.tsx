import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAllProducts,
  getCategories,
  getFeaturedProducts,
  deleteProduct as deleteProductApi,
  toggleFeaturedProduct as toggleFeaturedProductApi,
  createProduct as createProductApi,
} from "../../lib/api";
import { ProductContext } from "./productContextObject";
import toast from "react-hot-toast";
export function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
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
  const { data: allProducts, isLoading: isAllProductsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const {
    data: featuredProductsData = [],
    isLoading: featuredProductsLoading,
  } = useQuery({
    queryKey: ["products", "featuredProducts"],
    queryFn: getFeaturedProducts,
  });
  const {
    mutate: deleteProduct,
    isPending: isDeletingProductPending,
    variables: deletingProductId,
  } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
  });
  const {
    mutate: toggleFeaturedProduct,
    isPending: isTogglingFeaturedProductPending,
    variables: togglingFeaturedProductId,
  } = useMutation({
    mutationFn: toggleFeaturedProductApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  const { mutate: createProduct, isPending: isCreatingProductPending } =
    useMutation({
      mutationFn: createProductApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product created successfully");
      },
    });
  return (
    <ProductContext.Provider
      value={{
        categories: categoriesData?.data ?? [],
        categoriesLoading,
        featuredProducts: featuredProductsData?.data ?? [],
        featuredProductsLoading,
        products: allProducts?.data ?? [],
        isAllProductsLoading,
        deleteProduct,
        toggleFeaturedProduct,
        isTogglingFeaturedProductPending,
        togglingFeaturedProductId,
        createProduct,
        isCreatingProductPending,
        isDeletingProductPending,
        deletingProductId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
