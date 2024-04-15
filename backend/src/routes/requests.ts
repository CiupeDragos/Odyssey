import { UserDbModel } from "db_models/User/model";

export type RegisterRequest = {
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
  password: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type ProfileDataRequest = {
  userId: string;
};
