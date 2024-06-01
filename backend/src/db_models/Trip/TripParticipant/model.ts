import { Gender } from "../../User/model";
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
    participantId: { type: String, required: false },
    participantUsername: { type: String, required: false },
    gender: { type: String, enum: Object.values(Gender), required: true },
    age: { type: Number, required: true },
    minAge: { type: Number, required: true },
    maxAge: { type: Number, required: true },
    index: { type: Number, required: true },
  });
