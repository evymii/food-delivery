var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signIn = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = yield User.findOne({ email });
        const comparedPass = yield bcrypt.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        const token = jwt.sign({ userId: (user === null || user === void 0 ? void 0 : user._id) || "" }, "meow-test", {
            expiresIn: "2h",
        });
        if (comparedPass) {
            response.status(200).json({
                success: true,
                message: "Authenticated",
                token: token,
            });
        }
        else {
            response.status(200).json({
                success: false,
                message: "not authenticated",
            });
        }
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
});
export const signUp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    try {
        const saltRounds = 10;
        const salt = yield bcrypt.genSalt(saltRounds);
        const hash = yield bcrypt.hash(password, salt);
        const createdUser = yield User.create({
            email: email,
            password: hash,
        });
        response.status(200).json({
            success: true,
            data: createdUser,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
});
export const refresh = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        response.send({ success: true, data: users });
    }
    catch (error) {
        response.status(303).json({ success: false, error: error });
    }
});
export const getUserByid = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.params;
        const user = yield User.findById(userId);
        response.json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
});
export const updateUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.params;
        const updatedUser = request.body;
        const user = yield User.findByIdAndUpdate(userId, updatedUser, {
            new: true,
        });
        response.json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
});
export const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.params;
        const deletedUser = yield User.findByIdAndDelete(userId);
        response.json({
            success: true,
            data: deletedUser,
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            error: error,
        });
    }
});
export const resetPasswordRequest = (_request, response) => {
    response.send("auth/resetPassword huselt irlee");
};
export const verifyResetPasswordRequest = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = yield User.findOne({ email });
        const validPassword = yield bcrypt.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        if (!validPassword) {
            response.status(200).json({
                success: false,
                message: "Not authenticated",
                isVerified: false,
            });
        }
        else {
            const token = jwt.sign({ userId: (user === null || user === void 0 ? void 0 : user._id) || "" }, "pinecone-test", {
                expiresIn: "24h",
            });
            response.status(200).json({
                success: true,
                message: "Authenticated",
                token: token,
                isVerified: true,
            });
        }
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
});
export const resetPassword = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, newPassword, confirmPassword } = request.body;
        if (!email || !password || !newPassword || !confirmPassword) {
            return response.status(400).json({
                success: false,
                message: "incorrect check all input",
            });
        }
        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                success: false,
                message: "New password not matching",
            });
        }
        const user = yield User.findOne({ email });
        if (!user) {
            return response.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }
        const saltRounds = 10;
        const hashedNewPassword = yield bcrypt.hash(newPassword, saltRounds);
        const updatedUser = yield User.findByIdAndUpdate(user._id, { password: hashedNewPassword }, { new: true });
        const userWithoutPassword = updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.toObject();
        // delete userWithoutPassword?.password;
        return response.status(200).json({
            success: true,
            message: "Password updated successfully",
            data: userWithoutPassword,
        });
    }
    catch (error) {
        console.error("Password reset error:", error);
        return response.status(500).json({
            success: false,
            message: " server error",
            error: error,
        });
    }
    response.send("auth/ resetPassword huselt irlee");
});
