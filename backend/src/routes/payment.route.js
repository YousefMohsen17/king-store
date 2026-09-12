import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  checkoutSuccess,
  createCheckoutSession,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", isAuth, createCheckoutSession);
router.post("/checkout-success", isAuth, checkoutSuccess);

export default router;
