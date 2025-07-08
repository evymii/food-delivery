import mongoose from "mongoose";
const { Schema, model } = mongoose;
const user = new Schema({
    email: { type: String, required: [true, "email required"], unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: String,
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });
export const User = model("User", user);
