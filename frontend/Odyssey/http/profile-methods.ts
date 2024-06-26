import axios from "axios";
import { ProfileData } from "../types/response-types";
import { HttpResponse } from "./HttpResponse";
import { BASE_URL } from "../util/constants";
import { genericGetMethod, genericPostMethod } from "./base-methods";
import {
  FollowUserRequest,
  ProfileDataRequest,
  ProfileUpdateRequest,
} from "../types/request-types";

export function getProfileData(
  userId: string,
  requesterId: string
): Promise<HttpResponse<ProfileData>> {
  const queryParams: ProfileDataRequest = {
    userId: userId,
    requesterId: requesterId,
  };
  return genericGetMethod("profileData", queryParams);
}

export function updateUserProfile(
  profileUpdateRequest: ProfileUpdateRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(profileUpdateRequest, "updateProfileData");
}

export function followUser(
  followUserRequest: FollowUserRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(followUserRequest, "followUser");
}
