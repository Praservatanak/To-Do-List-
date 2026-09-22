import { body } from "express-validator";
import { validate } from "../middlewares/validation.js";

export const createUserValidate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("age")
    .isInt({ min: 10, max: 100 })
    .withMessage("Age must be between 10 and 100"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail()
    .isEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain uppercase, lowercase, and number"),
  validate,
];

export const updateUserValidation = [
  body("name").optional().trim().isLength({ min: 3, max: 50 }),

  body("email").optional().trim().normalizeEmail().isEmail(),

  body("age").optional().isInt({ min: 10, max: 100 }),

  validate,
];
