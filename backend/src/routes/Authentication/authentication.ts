import { Request, Response } from "express";
import { LoginRequest, RegisterRequest } from "../requests";
import {
  decryptPassword,
  encryptPassword,
  isRequestValid,
} from "../../util/methods";
import { INVALID_REQUEST_BODY_MESSAGE } from "../../util/constants";
import UserMethods from "../../db_models/User/methods";
import { UserDbModel } from "../../db_models/User/model";
import { UserData } from "../responses";

export const registerUser = async (req: Request, res: Response) => {
  const registerRequest: RegisterRequest = {
    username: req.body.username,
    realName: req.body.realName,
    birthTimestamp: req.body.birthTimestamp,
    country: req.body.country,
    password: req.body.password,
  };

  if (!isRequestValid(registerRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const doesUserExist = await UserMethods.findByUsername(
    registerRequest.username
  );

  if (doesUserExist) {
    res.status(400).send("The username is already in use");
    return;
  }

  const encryptedPassword = await encryptPassword(registerRequest.password);

  const userToAdd: UserDbModel = {
    ...registerRequest,
    visitedCountries: new Array(),
    favoriteCountry: "",
    profileDescription: "",
    followers: new Array(),
    following: new Array(),
    password: encryptedPassword,
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

  const isPasswordCorrect = await decryptPassword(
    loginRequest.password,
    user.password
  );

  if (!isPasswordCorrect) {
    res.status(400).send("The username and password do not match");
    return;
  }

  /*
   Password is still passed,but not accesible through the object interface,
   typescript doesn't complain about extra properties when spreading objects apparently

   UserData is equal to User,without the password
  */
  const userData: UserData = { ...user };

  res.json(userData);
};
