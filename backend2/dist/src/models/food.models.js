import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const food = new Schema({
    id: { type: Types.ObjectId, ref: "OrderItemSchema" },
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
    category: { type: Types.ObjectId, ref: "Category" },
}, { timestamps: true });
export const Food = model("Food", food);
