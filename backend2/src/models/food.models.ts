import mongoose from "mongoose";
import { orderItemSchema } from "./order.models.js";

const { Schema, model } = mongoose;

const food = new Schema(
  {
    id: [orderItemSchema],
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
  },
  { timestamps: true }
);

export const Food = model("Food", food);
