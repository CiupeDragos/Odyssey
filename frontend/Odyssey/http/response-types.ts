import { LocationTypeEnum } from "../util/enums";

export type UserData = {
  id: string;
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
};

//

export type LocationPoster = {
  userId: string;
  username: string;
};

export type TextLocation = {
  country: string;
  city: string;
};

export type Coordinates = {
  lat: number;
  long: number;
};

export type Rating = {
  safe: number;
  fun: number;
  crowded: number;
  expensive: number;
};

export type Follower = {
  userId: string;
  username: string;
};

export type LocationPost = {
  id: string;
  title: string;
  postedBy: LocationPoster;
  description: string;
  photos: Array<string>;
  textLocation: TextLocation;
  coordinates: Coordinates;
  categories: Array<LocationTypeEnum>;
  rating: Rating;
};

export type ProfileData = {
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
  visitedCountries: Array<string>;
  favoriteCountry: string;
  profileDescription: string;
  followers: Array<Follower>;
  following: Array<Follower>;
  postedLocations: Array<LocationPost>;
};
