import express from "express";
import ConnectDb from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();
ConnectDb();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
