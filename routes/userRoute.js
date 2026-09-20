import express from "express";
import { getMe, updateMe, deleteMe } from "../Controllers/userController.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.delete("/me", protect, deleteMe);

export default router;
