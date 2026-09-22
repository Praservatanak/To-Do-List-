import express from "express";
import {
  login,
  register,
  logout,
  refresh,
} from "../Controllers/authController.js";
import { protect } from "../middlewares/protect.js";
import { authLimiter } from "../middlewares/rateLimit.js";
import { createUserValidate } from "../validators/userValidator.js";
const router = express.Router();

router.post("/login", authLimiter, login);
router.post("/register", createUserValidate, register);
router.post("/logout", protect, logout);
router.post("/refresh", refresh);
export default router;
