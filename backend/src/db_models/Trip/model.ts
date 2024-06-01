import mongoose from "mongoose";
import {
  TripParticipantDbModel,
  TripParticipantSchema,
} from "./TripParticipant/model";

export interface TripDbModel {
  organizerId: string;
  organizerUsername: string;
  title: string;
  description: string;
  visitedCountries: Array<string>;
  participants: Array<TripParticipantDbModel>;
  startTimestamp: number;
  endTimestamp: number;
}

export type Trip = {
  id: string;
  organizerId: string;
  organizerUsername: string;
  title: string;
  description: string;
  visitedCountries: Array<string>;
  participants: Array<TripParticipantDbModel>;
  startTimestamp: number;
  endTimestamp: number;
};

const TripSchema = new mongoose.Schema<TripDbModel>({
  organizerId: { type: String, required: true },
  organizerUsername: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  visitedCountries: { type: [String], required: true },
  participants: { type: [TripParticipantSchema], required: true },
  startTimestamp: { type: Number, required: true },
  endTimestamp: { type: Number, required: true },
});

export const TripModel = mongoose.model<TripDbModel>("trip", TripSchema);
