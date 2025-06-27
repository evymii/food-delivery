import express from "express";
import {
  refresh,
  getUserByid,
  updateUser,
  deleteUser,
  signIn,
  signUp,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signin", signIn);
userRouter.post("/signUp", signUp);
userRouter.get("/", refresh);
userRouter.get("/:userId", getUserByid);
userRouter.patch("/:foodOrderId", updateUser);
userRouter.delete("/:foodOrderId", deleteUser);
export default userRouter;
