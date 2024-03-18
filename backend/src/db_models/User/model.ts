import mongoose from "mongoose";

export interface UserDbModel {
  username: string;
  password: string;
}

export type User = {
  id: string;
  username: string;
  password: string;
};

const userSchema = new mongoose.Schema<UserDbModel>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<UserDbModel>("user", userSchema);
