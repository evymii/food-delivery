import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;
const orderItemSchema = new Schema({
    foodName: { type: Types.ObjectId, ref: "Food" },
    quantity: Number,
});
export const OrderItemSchema = model("OrderItemSchema", orderItemSchema);
const order = new Schema({
    orderItems: [orderItemSchema],
    status: {
        type: String,
        enum: ["PENDING", "CANCELED", "DELIVERED"],
        default: "PENDING",
    },
    user: { type: Types.ObjectId, ref: "User" },
    totalPrice: Number,
}, { timestamps: true });
export const Order = model("Order", order);
