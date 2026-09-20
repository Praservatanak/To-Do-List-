class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }

  static badRequest(msg = "Bad Request") {
    return new ApiError(400, msg);
  }
  static unauthorized(msg = "Not authenticated") {
    return new ApiError(401, msg);
  }
  static forbidden(msg = "Forbidden! Cannot access") {
    return new ApiError(403, msg);
  }
  static notFound(msg = "Resource not found") {
    return new ApiError(404, msg);
  }

  static internal(msg = "Internal Server Error") {
    return new ApiError(500, msg);
  }
}
export default ApiError;
