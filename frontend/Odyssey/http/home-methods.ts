import {
  AddLocationRequest,
  LocationPostsRequest,
} from "../types/request-types";
import { LocationPost } from "../types/response-types";
import { MAPS_API_KEY } from "../util/constants";
import { HttpResponse } from "./HttpResponse";
import { genericGetMethod, genericPostMethod } from "./base-methods";

export function getAdressFromCoordinates(
  lat: number,
  long: number
): Promise<HttpResponse<any>> {
  const payload = {
    latlng: `${lat},${long}`,
    key: MAPS_API_KEY,
  };

  return genericGetMethod(
    undefined,
    payload,
    "https://maps.googleapis.com/maps/api/geocode/json"
  );
}

export function addLocationPost(
  addLocationRequest: AddLocationRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(addLocationRequest, "addLocation");
}

export function getLocationPosts(
  userId?: string
): Promise<HttpResponse<Array<LocationPost>>> {
  const params: LocationPostsRequest = {
    posterId: userId,
  };

  return genericGetMethod("locationPosts", params);
}
