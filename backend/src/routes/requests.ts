import { Coordinates } from "db_models/LocationPost/Coordinates/model";
import { LocationPoster } from "db_models/LocationPost/LocationPoster/model";
import { Rating } from "db_models/LocationPost/Rating/model";
import { TextLocation } from "db_models/LocationPost/TextLocation/model";
import { LocationTypeEnum } from "db_models/LocationPost/model";
import { ThreadType } from "db_models/LoungeThread/model";
import { TripParticipantDbModel } from "db_models/Trip/TripParticipant/model";
import { Gender } from "db_models/User/model";

export type RegisterRequest = {
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
  password: string;
  gender: Gender;
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

export type LocationPostsRequest = {
  userId: string;
};

export type SearchUsersRequest = {
  searchQuery: string;
};

export type LikeLocationRequest = {
  userId: string;
  locationId: string;
};

export type AddCommentRequest = {
  authorId: string;
  authorUsername: string;
  content: string;
  timestamp: number;
  modelId: string;
};

export type AddLoungeThreadRequest = {
  threadType: ThreadType;
  authorId: string;
  authorUsername: string;
  title: string;
  content: string;
};

export type AddTripRequest = {
  organizerId: string;
  organizerUsername: string;
  title: string;
  description: string;
  visitedCountries: Array<string>;
  participants: Array<TripParticipantDbModel>;
  startTimestamp: number;
  endTimestamp: number;
};

export type JoinTripRequest = {
  userId: string;
  tripId: string;
  spotIndex: number;
};

export type GetTripsRequest = {
  posterId?: string;
  participantId?: string;
};
