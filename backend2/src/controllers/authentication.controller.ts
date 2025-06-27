import { Request, Response } from "express";

export const getUserAuth = async (request: Request, response: Response) => {
  response.send("food/ Get huselt irlee");
};

export const getUserResetPassReq = async (
  request: Request,
  response: Response
) => {
  response.send("food/ Get huselt irlee");
};

export const createUserSignIn = async (
  request: Request,
  response: Response
) => {
  response.send("food/:foodId Get huselt irlee");
};

export const createUserSignUp = async (
  request: Request,
  response: Response
) => {
  response.send("food/ Post huselt irlee");
};

export const createUserResetPassReq = async (
  request: Request,
  response: Response
) => {
  response.send("food/:foodId Patch huselt irlee");
};

export const createUserResetPass = async (
  request: Request,
  response: Response
) => {
  response.send("food/:foodId Delete huselt irlee");
};
