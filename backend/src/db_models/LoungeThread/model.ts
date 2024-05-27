import { Comment, CommentSchema } from "../../db_models/Comment/model";
import mongoose from "mongoose";

export enum ThreadType {
  DISCUSSION = "Open discussion",
  QUESTION = "Question",
}

export interface LoungeThreadDbModel {
  threadType: ThreadType;
  authorId: string;
  authorUsername: string;
  title: string;
  content: string;
  answers: Array<Comment>;
  timestamp: number;
}

export type LoungeThread = {
  id: string;
  threadType: ThreadType;
  authorId: string;
  authorUsername: string;
  title: string;
  content: string;
  answers: Array<Comment>;
  timestamp: number;
};

const LoungeThreadSchema = new mongoose.Schema<LoungeThreadDbModel>({
  threadType: { type: String, enum: Object.values(ThreadType), required: true },
  authorId: { type: String, required: true },
  authorUsername: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  answers: { type: [CommentSchema], required: true },
  timestamp: { type: Number, required: true },
});

export const LoungeThreadModel = mongoose.model<LoungeThreadDbModel>(
  "lounge_threads",
  LoungeThreadSchema
);
