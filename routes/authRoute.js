import express from "express";
import {
  login,
  register,
  logout,
  refresh,
} from "../Controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", protect, logout);
router.post("/refresh", protect, refresh);
