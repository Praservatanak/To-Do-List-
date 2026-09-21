import express from "express";
import {
  getMe,
  updateMe,
  deleteMe,
  getAllUser,
} from "../Controllers/userController.js";
import { protect } from "../middlewares/protect.js";
import { authorization } from "../middlewares/authorization.js";

const router = express.Router();
router.get("/", protect, authorization("admin"), getAllUser);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.delete("/me", protect, deleteMe);

export default router;
