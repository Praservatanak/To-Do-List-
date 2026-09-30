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
import {
  createTodoValidator,
  updateTodoValidator,
} from "../validators/todoValidator.js";
const router = express.Router();
router.use(protect);
router.post("/", createTodoValidator, createTodo);
router.get("/", getUserTodo);
router.get("/all", authorization("admin"), getAllTodo);

router.get("/:id", checkOwnership, getTodo);
router.patch("/:id", checkOwnership, updateTodoValidator, updateTodo);
router.delete("/:id", checkOwnership, deleteTodo);

export default router;
