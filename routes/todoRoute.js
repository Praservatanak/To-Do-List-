import express from "express";
import {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  getUserTodo,
} from "../Controllers/todoController.js";
import { protect } from "../middlewares/protect.js";
import { authorization } from "../middlewares/authorization.js";
import { checkOwnership } from "../middlewares/checkOwnership.js";
const router = express.Router();
router.use(protect);
router.get("/all", authorization("admin"), getAllTodo);
router.post("/", createTodo);
router.get("/", getUserTodo);
router.get("/:id", checkOwnership, getTodo);
router.patch("/:id", checkOwnership, updateTodo);
router.delete("/:id", checkOwnership, deleteTodo);

export default router;
