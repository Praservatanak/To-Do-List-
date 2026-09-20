import ApiError from "../utils/ApiError.js";

const authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden(
        `${req.user.role} role is not allowed to use this route`,
      );
    }
    next();
  };
};

export { authorization };
