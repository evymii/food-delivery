import jwt from "jsonwebtoken";
import { request, response } from "express";
import { User } from "../models";

export const verifyToken = async (request: any, response: any, next: any) => {
  const token = request.header("Authorization");

  const user = await User.findOne(request.userId);

  console.log("user", user);

  if (!token) return response.status(401).json({ error: "Access denied" });

  if (user?.role === "User") {
    try {
      const decoded: any = jwt.verify(token, "meow-test");
      request.userId = decoded.userId;
      next();
    } catch (error) {
      response.status(400).json({ error: error });
    }
  } else {
    response.status(400).json({ error: "Access denied!" });
  }
};
