import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import categoriesRouter from "./routes/category.routes.js";
import { authenticate } from "./middleware/auth.middleware.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use("/api/auth", authRouter);

app.use(authenticate);

app.use("/api/categories", categoriesRouter);
app.use("/api/products", productRoutes);

export default app;
