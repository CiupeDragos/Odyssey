import mongoose from "mongoose";

export interface Comment {
  authorId: string;
  authorUsername: string;
  timestamp: number;
  content: string;
}

export const CommentSchema = new mongoose.Schema<Comment>({
  authorId: { type: String, required: true },
  authorUsername: { type: String, required: true },
  timestamp: { type: Number, required: true },
  content: { type: String, required: true },
});
