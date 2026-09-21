import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { apiLimiter } from "./middlewares/rateLimit.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import todoRoutes from "./routes/todoRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use("/api", apiLimiter);

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(mongoSanitize());
app.use(hpp());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorHandler);

const startServer = async () => {
  await connectDb();
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000");
  });
};

startServer();
