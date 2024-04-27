import mongoose from "mongoose";

export interface Follower {
  userId: string;
  username: string;
}

export const FollowerSchema = new mongoose.Schema<Follower>({
  userId: { type: String, required: true },
  username: { type: String, required: true },
});
