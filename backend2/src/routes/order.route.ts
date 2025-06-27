import express from "express";
import {
  getFoodOrder,
  getFoodOrderById,
  createFoodOrder,
  updateFoodOrder,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.get("/", getFoodOrder);
orderRouter.post("/", createFoodOrder);
orderRouter.get("/:userId", getFoodOrderById);
orderRouter.patch("/:foodOrderId", updateFoodOrder);

export default orderRouter;
