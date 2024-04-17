import axios from "axios";
import { ProfileData } from "./response-types";
import { HttpResponse } from "./HttpResponse";
import { BASE_URL } from "../util/constants";
import { genericGetMethod } from "./base-methods";

export async function getProfileData(
  userId: string
): Promise<HttpResponse<ProfileData>> {
  const queryParams = { userId: userId };
  return genericGetMethod("profileData", queryParams);
}
