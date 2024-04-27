import { LocationPost } from "db_models/LocationPost/model";
import { Follower } from "db_models/User/Follower/model";
import { User } from "db_models/User/model";

export type UserData = Omit<User, "password">;

export type ProfileData = {
  locationPosts: Array<LocationPost>;
  requesterFollowing: Array<Follower>;
} & Omit<Omit<User, "id">, "password">;
