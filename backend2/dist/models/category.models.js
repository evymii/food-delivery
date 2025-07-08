import mongoose from "mongoose";
const { Schema, model } = mongoose;
const category = new Schema({
    categoryName: String,
}, { timestamps: true });
export const Category = model("Category", category);
