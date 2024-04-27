import mongoose from "mongoose";

export interface LocationPoster {
  userId: string;
  username: string;
}

export const LocationPosterSchema = new mongoose.Schema<LocationPoster>({
  userId: { type: String, required: true },
  username: { type: String, required: true },
});
