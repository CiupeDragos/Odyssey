import axios from "axios";
import { ProfileData } from "./response-types";
import { HttpResponse } from "./HttpResponse";
import { BASE_URL } from "../util/constants";
import { genericGetMethod, genericPostMethod } from "./base-methods";
import {
  FollowUserRequest,
  ProfileDataRequest,
  ProfileUpdateRequest,
} from "./request-types";

export async function getProfileData(
  userId: string,
  requesterId: string
): Promise<HttpResponse<ProfileData>> {
  const queryParams: ProfileDataRequest = {
    userId: userId,
    requesterId: requesterId,
  };
  return genericGetMethod("profileData", queryParams);
}

export async function updateUserProfile(
  profileUpdateRequest: ProfileUpdateRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(profileUpdateRequest, "updateProfileData");
}

export async function followUser(
  followUserRequest: FollowUserRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(followUserRequest, "followUser");
}
