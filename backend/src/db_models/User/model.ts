import mongoose from "mongoose";

export interface UserDbModel {
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
  password: string;
}

export type User = {
  id: string;
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
  password: string;
};

const userSchema = new mongoose.Schema<UserDbModel>({
  username: { type: String, required: true },
  realName: { type: String, required: true },
  birthTimestamp: { type: Number, required: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<UserDbModel>("user", userSchema);
