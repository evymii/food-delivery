import mongoose from "mongoose";
import { orderItemSchema } from "./order.models.js";

const { Schema, model, Types } = mongoose;

const food = new Schema(
  {
    id: [orderItemSchema],
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
    category: { type: Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export const Food = model("Food", food);
