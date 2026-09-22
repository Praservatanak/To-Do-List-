import express from "express";
import {
  getMe,
  updateMe,
  deleteMe,
  getAllUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
} from "../Controllers/userController.js";
import { protect } from "../middlewares/protect.js";
import { authorization } from "../middlewares/authorization.js";
import { updateUserValidation } from "../validators/userValidator.js";

const router = express.Router();

router.get("/", protect, authorization("admin"), getAllUser);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateUserValidation, updateMe);
router.delete("/me", protect, deleteMe);
router.delete("/:id", protect, authorization("admin"), deleteOneUser);
router.get("/:id", protect, authorization("admin"), getOneUser);
router.patch(
  "/:id",
  protect,
  authorization("admin"),
  updateUserValidation,
  updateOneUser,
);

export default router;
