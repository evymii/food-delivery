import express, { Request, Response } from "express";
import foodsRouter from "./routes/food.route.js";
import mongoose from "mongoose";
import orderRouter from "./routes/order.route.js";
import categRouter from "./routes/category.route.js";
import authRouter from "./routes/authentic.route.js";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect((process.env.MONGOOSE_URL as string) || "");

const server = express();
server.use(express.json());

const port = process.env.PORT || 4000;

server.use("/food", foodsRouter);
server.use("/foodorder", orderRouter);
server.use("/foodcategory", categRouter);
server.use("/auth", authRouter);
server.use("/user", userRouter);

// server.get("/", (_request, response) => {
//   response.send("modelsw2");
// });

server.listen(port, () => {
  console.log(`Server aslaa http://localhost:${port}`);
});
