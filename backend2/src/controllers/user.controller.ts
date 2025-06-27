import { Request, Response } from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    const comparedPass = await bcrypt.compare(password, user?.password || "");
    const token = jwt.sign({ userId: user?._id || "" }, "meow-test", {
      expiresIn: "2h",
    });
    console.log(comparedPass);

    if (comparedPass) {
      response.status(200).json({
        success: true,
        message: "Authenticated",
        token: token,
      });
    } else {
      response.status(200).json({
        success: false,
        message: "not authenticated",
      });
    }
  } catch (error) {
    response.status(444).json({
      success: false,
      error: error,
    });
  }
};
export const signUp = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hash = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      email: email,
      password: hash,
    });
    response.status(200).json({
      success: true,
      data: createdUser,
    });
  } catch (error) {
    response.status(444).json({
      success: false,
      error: error,
    });
  }
};

export const refresh = async (_request: Request, response: Response) => {
  try {
    const users = await User.find();
    response.send({ success: true, data: users });
  } catch (error) {
    response.status(303).json({ success: false, error: error });
  }
};

export const getUserByid = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params;
    const user = await User.findById(userId);

    response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    response.status(444).json({
      success: false,
      error: error,
    });
  }
};

export const updateUser = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params;
    const updatedUser = request.body;

    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });

    response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    response.status(444).json({
      success: false,
      error: error,
    });
  }
};

export const deleteUser = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    response.json({
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const resetPassword = async (request: Request, response: Response) => {
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

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { password: hashedNewPassword },
      { new: true }
    );

    const userWithoutPassword = updatedUser?.toObject();
    // delete userWithoutPassword?.password;

    return response.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return response.status(500).json({
      success: false,
      message: " server error",
      error: error,
    });
  }
};
