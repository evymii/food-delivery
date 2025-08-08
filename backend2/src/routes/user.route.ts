import express from "express";
import {
  refresh,
  signIn,
  signUp,
  verifyResetPasswordRequest,
  resetPasswordRequest,
  resetPassword,
  getUserByid,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/refresh", refresh);
userRouter.get("/user", getUserByid);

userRouter.get("/verify-reset-password-request", verifyResetPasswordRequest);
userRouter.post("/log-in", signIn);
userRouter.post("/sign-up", signUp);
userRouter.post("/reset-password-request", resetPasswordRequest);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
