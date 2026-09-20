import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

const connectDb = asyncHandler(async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected successfully");
});

export { connectDb };
