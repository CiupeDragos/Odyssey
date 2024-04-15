import mongoose from "mongoose";

export interface TextLocation {
  country: string;
  city: string;
}

export const TextLocationSchema = new mongoose.Schema<TextLocation>({
  country: { type: String, required: true },
  city: { type: String, required: true },
});
