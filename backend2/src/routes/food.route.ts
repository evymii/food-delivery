import express from "express";
import {
  getAllFoods,
  getFoodByid,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/food.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const foodsRouter = express.Router();

foodsRouter.get("/", getAllFoods);
foodsRouter.post("/", upload.single("image"), createFood);
foodsRouter.patch("/:foodId", updateFood);
foodsRouter.delete("/:foodId", deleteFood);
foodsRouter.get("/:foodId", getFoodByid);

export default foodsRouter;
