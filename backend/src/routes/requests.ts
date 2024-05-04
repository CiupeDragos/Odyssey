import { Coordinates } from "db_models/LocationPost/Coordinates/model";
import { LocationPoster } from "db_models/LocationPost/LocationPoster/model";
import { Rating } from "db_models/LocationPost/Rating/model";
import { TextLocation } from "db_models/LocationPost/TextLocation/model";
import { LocationTypeEnum } from "db_models/LocationPost/model";
import { UserDbModel } from "db_models/User/model";

export type RegisterRequest = {
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
  password: string;
};

export type ProfileUpdateRequest = {
  userId: string;
  base64Photo: string;
  country: string;
  favoriteCountry: string;
  visitedCountries: Array<string>;
  description: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type ProfileDataRequest = {
  userId: string;
  requesterId: string;
};

export type FollowUserRequest = {
  fromUserId: string;
  toUserId: string;
};

export type AddLocationRequest = {
  title: string;
  postedBy: LocationPoster;
  description: string;
  photos: Array<string>;
  textLocation: TextLocation;
  coordinates: Coordinates;
  categories: Array<LocationTypeEnum>;
  rating: Rating;
};
