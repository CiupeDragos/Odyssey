import mongoose from "mongoose";
import {
  TripParticipantDbModel,
  TripParticipantSchema,
} from "./TripParticipant/model";
import { Comment, CommentSchema } from "db_models/Comment/model";

export interface TripDbModel {
  organizerId: string;
  organizerUsername: string;
  title: string;
  description: string;
  visitedCountries: Array<string>;
  participants: Array<TripParticipantDbModel>;
  startTimestamp: number;
  endTimestamp: number;
  chat: Array<Comment>;
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
  chat: Array<Comment>;
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
  chat: { type: [CommentSchema], required: true },
});

export const TripModel = mongoose.model<TripDbModel>("trip", TripSchema);
