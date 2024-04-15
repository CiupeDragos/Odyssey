import { Follower, FollowerSchema } from "db_models/User/Follower/model";
import mongoose from "mongoose";

/*
  ⦁	visited countries
  ⦁	favorite country
  ⦁	profile description (bio)
  ⦁	number of posted locations
  ⦁	number of followers
  ⦁	number of people followed
*/

export interface UserDbModel {
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
  password: string;
  visitedCountries: Array<string>;
  favoriteCountry: string;
  profileDescription: string;
  followers: Array<Follower>;
  following: Array<Follower>;
}

export type User = {
  id: string;
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
  password: string;
  visitedCountries: Array<string>;
  favoriteCountry: string;
  profileDescription: string;
  followers: Array<Follower>;
  following: Array<Follower>;
};

const userSchema = new mongoose.Schema<UserDbModel>({
  username: { type: String, required: true },
  realName: { type: String, required: true },
  birthTimestamp: { type: Number, required: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
  visitedCountries: { type: [String], required: false },
  favoriteCountry: { type: String, required: false },
  profileDescription: { type: String, required: false },
  followers: { type: [FollowerSchema], required: false },
  following: { type: [FollowerSchema], required: false },
});

export const User = mongoose.model<UserDbModel>("user", userSchema);
