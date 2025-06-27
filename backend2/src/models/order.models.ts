import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

export const orderItemSchema = new Schema({
  foodName: { type: Types.ObjectId, ref: "Food" },
  quantity: Number,
});

const order = new Schema(
  {
    orderItems: [orderItemSchema],
    status: {
      type: String,
      enum: ["Pending", "Canceled", "Delivered"],
      default: "Pending",
    },
    user: { type: Types.ObjectId, ref: "User" },
    totalPrice: Number,
  },

  { timestamps: true }
);

export const Order = model("Order", order);
