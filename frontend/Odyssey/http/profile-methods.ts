import axios from "axios";
import { ProfileData } from "./response-types";
import { HttpResponse } from "./HttpResponse";
import { BASE_URL } from "../util/constants";
import { genericGetMethod, genericPostMethod } from "./base-methods";
import { ProfileUpdateRequest } from "./request-types";

export async function getProfileData(
  userId: string
): Promise<HttpResponse<ProfileData>> {
  const queryParams = { userId: userId };
  return genericGetMethod("profileData", queryParams);
}

export async function updateUserProfile(
  profileUpdateRequest: ProfileUpdateRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(profileUpdateRequest, "updateProfileData");
}
