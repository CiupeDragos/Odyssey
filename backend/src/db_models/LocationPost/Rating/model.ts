import mongoose from "mongoose";

export interface Rating {
  safe: number;
  fun: number;
  uncrowded: number;
  affordable: number;
}

export const RatingSchema = new mongoose.Schema<Rating>({
  safe: { type: Number, min: 0, max: 5, required: true },
  fun: { type: Number, min: 0, max: 5, required: true },
  uncrowded: { type: Number, min: 0, max: 5, required: true },
  affordable: { type: Number, min: 0, max: 5, required: true },
});
