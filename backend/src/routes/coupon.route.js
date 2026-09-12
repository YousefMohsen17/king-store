import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/", isAuth, getCoupon);
router.post("/validate", isAuth, validateCoupon);

export default router;
