import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// middleware
app.use(cors({
  origin: process.env["FRONTEND_URL"] || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// route
app.get("/", (req, res) => {
  res.send("Welcome to BlogTomasu");
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

export default app;