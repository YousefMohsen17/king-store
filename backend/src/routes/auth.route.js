import express from "express";
import {
  signup,
  login,
  logout,
  refreshToken,
  checkAuth,
} from "../src/controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refreshToken", refreshToken);
router.get("/check", isAuth, checkAuth);
export default router;
