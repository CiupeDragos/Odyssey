import { LocationPost } from "db_models/LocationPost/model";
import { User } from "db_models/User/model";

export type UserData = Omit<User, "password">;

export type ProfileData = {
  locationPosts: Array<LocationPost>;
} & Omit<Omit<User, "id">, "password">;
