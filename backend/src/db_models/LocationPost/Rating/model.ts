import mongoose from "mongoose";

export interface Rating {
  safe: number;
  fun: number;
  crowded: number;
  expensive: number;
}

export const RatingSchema = new mongoose.Schema<Rating>({
  safe: { type: Number, min: 0, max: 5, required: true },
  fun: { type: Number, min: 0, max: 5, required: true },
  crowded: { type: Number, min: 0, max: 5, required: true },
  expensive: { type: Number, min: 0, max: 5, required: true },
});
