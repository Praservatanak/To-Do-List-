import ApiError from "../utils/ApiError.js";
import Todo from "../models/todoSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const checkOwnership = asyncHandler(async (req, res, next) => {
  const resource = await Todo.findById(req.params.id);
  if (!resource) {
    throw ApiError.notFound("Resource not found");
  }
  const isOwner = resource.user.equals(req.user._id);
  const isAdmin = req.user.role == "Admin";
  if (!isOwner && !isAdmin) {
    throw ApiError.forbidden(
      "You do not have permission to modify this resource",
    );
  }
  req.resource = resource;
  next();
});

export { checkOwnership };
