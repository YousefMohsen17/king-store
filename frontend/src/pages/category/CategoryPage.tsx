import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "./components/ProductCard.tsx";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../../lib/api.tsx";
import type { ProductType } from "../../types/types";

const CategoryPage = () => {
  const { category } = useParams();
  const { data: categoryProducts } = useQuery({
    queryKey: ["products", "category", category],
    queryFn: () => getProductsByCategory(category as string),
  });

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "Category"}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categoryProducts?.data?.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
              No products found
            </h2>
          )}

          {categoryProducts?.data?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
export default CategoryPage;
