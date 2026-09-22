import { body } from "express-validator";
import { validate } from "../middlewares/validation.js";

export const createTodoValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title of task is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Title must have between 2 to 50 characters"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean")
    .toBoolean(),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date")
    .toDate()
    .custom((value) => {
      if (value <= new Date()) {
        throw new Error("Due date must be in the future");
      }
      return true;
    }),

  body("priorityLevel")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),

  body("subTasks")
    .optional()
    .isArray()
    .withMessage("SubTasks must be an array"),

  body("subTasks.*.title")
    .if(body("subTasks").exists())
    .trim()
    .notEmpty()
    .withMessage("Subtask title is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Subtask title must have between 2 to 50 characters"),

  body("subTasks.*.completed")
    .optional()
    .isBoolean()
    .withMessage("Subtask completed must be a boolean")
    .toBoolean(),

  body("subTasks.*.priorityLevel")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Subtask priority must be Low, Medium, or High"),

  validate,
];

export const updateTodoValidator = [
  body("title")
    .optional()
    .trim()

    .isLength({ min: 2, max: 50 })
    .withMessage("Title must have between 2 to 50 characters"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean")
    .toBoolean(),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date")
    .toDate()
    .custom((value) => {
      if (value <= new Date()) {
        throw new Error("Due date must be in the future");
      }
      return true;
    }),

  body("priorityLevel")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),

  body("user")
    .optional()

    .isMongoId()
    .withMessage("User must be a valid MongoDB ID"),

  body("subTasks")
    .optional()
    .isArray()
    .withMessage("SubTasks must be an array"),

  body("subTasks.*.title")
    .if(body("subTasks").exists())
    .optional()
    .trim()

    .isLength({ min: 2, max: 50 })
    .withMessage("Subtask title must have between 2 to 50 characters"),

  body("subTasks.*.completed")
    .optional()
    .isBoolean()
    .withMessage("Subtask completed must be a boolean")
    .toBoolean(),

  body("subTasks.*.priorityLevel")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Subtask priority must be Low, Medium, or High"),

  validate,
];
