import { UserDbModel } from "db_models/User/model";

export type RegisterRequest = UserDbModel;

export type LoginRequest = {
  username: string;
  password: string;
};
