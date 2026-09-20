import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Todo from "../models/todoSchema.js";

export const createTodo = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priorityLevel, subTasks } = req.body;
  const todo = await Todo.create({
    title,
    description,
    completed: false,
    dueDate,
    priorityLevel,
    user: req.user._id,
    subTasks,
  });
  res.status(201).json({ success: true, data: todo });
});

export const getTodo = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.resource,
  });
});

export const updateTodo = asyncHandler(async (req, res) => {
  const updateFields = [
    "title",
    "description",
    "dueDate",
    "completed",
    "priorityLevel",
    "subTasks",
  ];
  updateFields.forEach((f) => {
    if (req.body[f] !== undefined) {
      req.resource[f] = req.body[f];
    }
  });
  await req.resource.save();
  res.status(200).json({
    success: true,
    data: req.resource,
  });
});

export const deleteTodo = asyncHandler(async (req, res) => {
  await req.resource.deleteOne();
  res.status(200).json({
    success: true,
    data: null,
  });
});

export const getUserTodo = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    data: todos,
  });
});

export const getAllTodo = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({
    success: true,
    data: todos,
  });
});
