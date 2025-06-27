import express from "express";
import {
  getFoodCategory,
  createFoodCategory,
  updateFoodCategory,
  deleteFoodCategory,
} from "../controllers/category.controller.js";

const categRouter = express.Router();

categRouter.get("/", getFoodCategory);
categRouter.post("/", createFoodCategory);
categRouter.patch("/:foodCategoryId", updateFoodCategory);
categRouter.delete("/:foodCategoryId", deleteFoodCategory);

export default categRouter;
