import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;
  error.message = err.message;
  error.stack = err.stack;
  error.statusCode = err.statusCode;

  console.error(err);

  if (err.name == "CastError") {
    const message = "Resource not found";
    error = new ApiError(404, message);
  }
  if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(401, message);
  }
  if (err.name == "JsonWebTokenError") {
    const message = "Invalid token";
    error = new ApiError(401, message);
  }
  if (err.name == "TokenExpiredError") {
    const message = "Token expired";
    error = new ApiError(401, message);
  }
  if (err.code == 11000) {
    const message = "Duplicated field value entered";
    error = new ApiError(400, message);
  }
  if (err.code === "ECONNREFUSED") {
    const message = "External server not connected";
    error = new ApiError(502, message);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV == "development" && { stack: err.stack }),
  });
};

export { errorHandler };
