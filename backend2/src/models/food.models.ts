import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const food = new Schema(
  {
    id: { type: Types.ObjectId, ref: "OrderItemSchema" },
    foodName: { type: String, required: [true, "Please enter food name"] },
    price: { type: Number, required: [true, "Please enter price"] },
    image: String,
    cloudinaryPublicId: String, // Store Cloudinary public ID for deletion
    ingredients: String,
    category: { type: Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export const Food = model("Food", food);
