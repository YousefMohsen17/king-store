import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  getAllCoupons,
  validateCoupon,
  deleteCoupon,
  createCoupon,
} from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/", isAuth, getAllCoupons);
router.post("/validate", isAuth, validateCoupon);
router.delete("/:id", isAuth, deleteCoupon);
router.post("/", isAuth, createCoupon);

export default router;
