import { Request, Response, NextFunction } from "express";
import { createError } from "./error.middleware.js";

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError("Email and password are required", 400));
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return next(createError("Email and password must be strings", 400));
  }

  if (password.length < 6) {
    return next(
      createError("Password must be at least 6 characters long", 400)
    );
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(createError("Invalid email format", 400));
  }

  next();
};

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return next(
      createError("Email, password, and confirm password are required", 400)
    );
  }

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return next(createError("All fields must be strings", 400));
  }

  if (password.length < 6) {
    return next(
      createError("Password must be at least 6 characters long", 400)
    );
  }

  if (password !== confirmPassword) {
    return next(createError("Passwords do not match", 400));
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(createError("Invalid email format", 400));
  }

  next();
};

export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return next(createError("Invalid ID format", 400));
  }

  next();
};
