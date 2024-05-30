import { Gender } from "db_models/User/model";
import mongoose from "mongoose";

export interface TripParticipantDbModel {
  participantId: string;
  participantUsername: string;
  gender: Gender;
  age: number;
  minAge: number;
  maxAge: number;
  index: number;
}

export const TripParticipantSchema =
  new mongoose.Schema<TripParticipantDbModel>({
    participantId: { type: String, required: true },
    participantUsername: { type: String, required: true },
    gender: { type: String, enum: Object.values(Gender), required: true },
    age: { type: Number, required: true },
    minAge: { type: Number, required: true },
    maxAge: { type: Number, required: true },
    index: { type: Number, required: true },
  });
