import express from "express";
import ConnectDb from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();
app.use(errorHandler);

app.use("/api/auth", authRoutes);

ConnectDb();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
