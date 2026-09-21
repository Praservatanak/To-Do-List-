import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/userSchema.js";
import ApiError from "../utils/ApiError.js";

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const updateMe = asyncHandler(async (req, res) => {
  if (req.body.password) {
    throw ApiError.badRequest(
      "Cannot change password in this route. Use /api/auth/password-change",
    );
  }
  const allowField = ["name", "age"];
  const update = {};
  allowField.forEach((f) => {
    if (req.body[f] !== undefined) {
      update[f] = req.body[f];
    }
  });
  const user = await User.findByIdAndUpdate(req.user._id, update, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});

export const deleteMe = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(200).json({ success: true, message: "User deleted successfully" });
});

export const getAllUser = asyncHandler(async (req, res) => {
  const { sort } = req.query;
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  if (page <= 0) {
    return res.status(400).json({
      success: false,
      error: "Page must be greater than 0",
    });
  }

  if (limit < 1 || limit > 100) {
    return res.status(400).json({
      success: false,
      error: "Limit must be between 1 and 100",
    });
  }
  const result = await User.paginate(
    {},
    {
      limit,
      page,
      sort: sort || "-createdAt",
      select: "name age email role",
      customLabels: {
        docs: "users",
        totalDocs: "total",
        limit: "perPage",
        page: "currentPage",
        nextPage: "next",
        prevPage: "prev",
        totalPages: "pages",
        pagingCounter: "serialNo",
        meta: "pagination",
      },
    },
  );
  res.status(200).json({
    success: true,
    data: result,
  });
});
