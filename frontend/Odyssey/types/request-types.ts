import { Gender, LocationTypeEnum, ThreadType } from "../util/enums";
import {
  LocationPoster,
  TextLocation,
  Coordinates,
  Rating,
  TripParticipant,
} from "./response-types";

export type RegisterRequest = {
  username: string;
  realName: string;
  birthTimestamp: number;
  country: string;
  password: string;
  gender: Gender;
};

export type LoginRequest = {
  username: string;
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
  locationId: string;
};

export type AddThreadReplyRequest = {
  authorId: string;
  authorUsername: string;
  content: string;
  timestamp: number;
  loungeThreadId: string;
};

export type AddTripMessageRequest = {
  authorId: string;
  authorUsername: string;
  content: string;
  timestamp: number;
  tripId: string;
};

export type GetCommentsRequest = {
  locationId: string;
};

export type GetThreadRepliesRequest = {
  loungeThreadId: string;
};

export type AddLoungeThreadRequest = {
  threadType: ThreadType;
  authorId: string;
  authorUsername: string;
  title: string;
  content: string;
};

export type GetLoungeThreadsRequest = {
  authorId?: string;
};

export type AddTripRequest = {
  organizerId: string;
  organizerUsername: string;
  title: string;
  description: string;
  visitedCountries: Array<string>;
  participants: Array<TripParticipant>;
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
