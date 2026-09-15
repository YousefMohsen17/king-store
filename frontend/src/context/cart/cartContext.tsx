import { CartContext } from "./cartContextObject";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart as addToCartApi,
  getCart as getCartApi,
} from "../../lib/api";
import toast from "react-hot-toast";
export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  //   if (isLoading) {
  //     return (
  //       <div className="flex items-center justify-center h-screen">
  //         <span className="loading loading-spinner loading-lg"></span>
  //       </div>
  //     );
  //   }
  const { data: cartData, isLoading: cartDataLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartApi,
  });
  const { mutate: addToCart } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      toast.success("Product added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartProducts: cartData?.data ?? null,
        cartDataLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
