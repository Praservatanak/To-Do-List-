import ApiError from "../utils/ApiError";

const errorHandler = (err, req, res, next) => {
  let error = err;
  error.statusCode = err.statusCode || 500;
  error.stack = err.stack;
  error.message = err.message;

  console.log(err);
  if (err.name == "CastError") {
    error = new ApiError(404, "Resource not found");
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, message);
  }
  if (err.name === "JsonWebTokenError") {
    message = "JWT provided invalid";
    error = new ApiError(401, message);
  }
  if (err.name === "TokenExpiredError") {
    message = "Token expired";
    error = new ApiError(401, message);
  }
  if (err.code === 11000) {
    message = "Duplicated field value entered";
    error = new ApiError(400, message);
  }
  if (err.name === "VersionError") {
    error = new ApiError(409, "Document was modified, please try again");
  }

  if (err.name === "MongoNetworkError") {
    error = new ApiError(503, "Database connection failed");
  }

  if (err.name === "StrictModeError") {
    error = new ApiError(400, "Invalid field in request");
  }
  if (err.code === "ECONNREFUSED") {
    error = new ApiError(503, "External service unavailable");
  }
  if (err.code === "ETIMEDOUT") {
    error = new ApiError(504, "Request timed out");
  }
  if (err.name === "TooManyRequestsError") {
    error = new ApiError(429, "Too many requests, please try again later");
  }
};

export { errorHandler };
