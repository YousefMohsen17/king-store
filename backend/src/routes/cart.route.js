import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
const router = express.Router();
import { isAuth } from "../middlewares/auth.middleware.js";
router.get("/", isAuth, getCart);
router.post("/", isAuth, addToCart);
router.patch("/:productId", isAuth, updateQuantity);
router.delete("/:productId", isAuth, removeFromCart);
export default router;
