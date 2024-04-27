import mongoose from "mongoose";

export interface Coordinates {
  lat: number;
  long: number;
}

export const CoordinatesSchema = new mongoose.Schema<Coordinates>({
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
});
