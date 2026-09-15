import express from "express";
import {
  addFeaturedProducts,
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getCategories,
} from "../controllers/product.controller.js";
import { isAuth, isAdmin } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.get("/", isAuth, isAdmin, getAllProducts);

router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/categories", getCategories);
router.post("/", isAdmin, createProduct);
router.patch("/:id", isAdmin, addFeaturedProducts);
router.delete("/:id", isAdmin, deleteProduct);

export default router;
