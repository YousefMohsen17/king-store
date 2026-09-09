import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { isAuth, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.get("/", isAuth, isAdmin, getAllProducts);

router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.post("/", isAdmin, createProduct);
router.patch("/:id", isAdmin, toggleFeaturedProduct);
router.delete("/:id", isAdmin, deleteProduct);

export default router;
