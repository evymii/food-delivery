import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config/index.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import foodsRouter from "./routes/food.route.js";
import orderRouter from "./routes/order.route.js";
import categRouter from "./routes/category.route.js";
import userRouter from "./routes/user.route.js";

// Connect to MongoDB
mongoose
  .connect(config.mongoUrl)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const server = express();

// Middleware
server.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);

server.use(express.json());

// Routes
server.use("/api/food", foodsRouter);
server.use("/api/orders", orderRouter);
server.use("/api/categories", categRouter);
server.use("/api/auth", userRouter);

// Health check endpoint
server.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
server.use(notFound);
server.use(errorHandler);

const port = config.port;
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
});
