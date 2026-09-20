import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const generateAccessToken = (id) => {
  return jwt.sign(
    {
      sub: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "30m",
    },
  );
};

const generateRefreshToken = (id) => {
  return jwt.sign(
    {
      sub: id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "15d",
    },
  );
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized("Incorrect password");
  }
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 60 * 24 * 1000,
  });
  res.json({
    success: true,
    accessToken,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

export const register = asyncHandler(async (req, res) => {
  const { name, age, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.badRequest("User already exists");
  }
  const user = await User.create({ name, age, email, password });
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 60 * 24 * 1000,
  });
  res.json({
    success: true,
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      age: user.age,
      email: user.email,
      role: user.role,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  if (req.cookies?.refreshToken) {
    const user = await User.findOne({
      refreshToken: req.cookies?.refreshToken,
    }).select("+refreshToken");
    if (user) {
      user.refreshToken = undefined;
      await user.save({ validateBeforeSave: false });
    }
  }

  res.clearCookie("refreshToken");
  res.json({ success: true, message: "Logged out successfully" });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    throw ApiError.unauthorized("No refresh token");
  }
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.sub).select("+refreshToken");
  if (!user || user.refreshToken !== token) {
    throw ApiError.unauthorized("Invalid request token");
  }
  const accessToken = generateAccessToken(user._id);
  res.json({
    success: true,
    accessToken,
    messgae: "New access token created",
  });
});
