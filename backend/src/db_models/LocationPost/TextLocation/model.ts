import mongoose from "mongoose";

export interface TextLocation {
  country: string;
  area: string; // Most of the times it will be the city,but not always
}

export const TextLocationSchema = new mongoose.Schema<TextLocation>({
  country: { type: String, required: true },
  area: { type: String, required: true },
});
