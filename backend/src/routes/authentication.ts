import { Request, Response } from "express";
import { LoginRequest, RegisterRequest } from "./requests";
import { isRequestValid } from "../util/methods";
import { INVALID_REQUEST_BODY_MESSAGE } from "../util/constants";
import UserMethods from "../db_models/User/methods";
import { UserDbModel } from "../db_models/User/model";

export const registerUser = async (req: Request, res: Response) => {
  const registerRequest: RegisterRequest = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!isRequestValid(registerRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const doesUserExist = !!(await UserMethods.findByUsername(
    registerRequest.username
  ));

  if (doesUserExist) {
    res.status(400).send("The username is already in use");
    return;
  }

  const userToAdd: UserDbModel = {
    username: registerRequest.username,
    password: registerRequest.password,
  };

  await UserMethods.add(userToAdd);

  res.send("Account registered successfully");
};

export const loginUser = async (req: Request, res: Response) => {
  const loginRequest: LoginRequest = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!isRequestValid(loginRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const user = await UserMethods.findByUsername(loginRequest.username);

  if (!user) {
    res.status(400).send("The username and password do not match");
    return;
  }

  if (user.password != loginRequest.password) {
    res.status(400).send("The username and password do not match");
    return;
  }

  res.send("You logged in successfully");
};
