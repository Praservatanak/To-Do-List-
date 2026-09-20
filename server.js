import express from "express";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import todoRoutes from "./routes/todoRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();
const app = express();
connectDb();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
