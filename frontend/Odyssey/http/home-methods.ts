import {
  AddLocationRequest,
  LikeLocationRequest,
  LocationPostsRequest,
} from "../types/request-types";
import { Coordinates, LocationPost } from "../types/response-types";
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

export function getDistanceBetweenPoints(
  origin: Coordinates,
  destination: Coordinates
): Promise<HttpResponse<any>> {
  const originString = `${origin.lat},${origin.long}`;
  const destinationString = `${destination.lat},${destination.long}`;

  const payload = {
    key: MAPS_API_KEY,
    units: "metric",
    origins: originString,
    destinations: destinationString,
  };

  return genericGetMethod(
    undefined,
    payload,
    "https://maps.googleapis.com/maps/api/distancematrix/json"
  );
}

export function likeLocation(
  userId: string,
  locationId: string
): Promise<HttpResponse<string>> {
  const payload: LikeLocationRequest = {
    userId: userId,
    locationId: locationId,
  };

  return genericPostMethod(payload, "likeLocation");
}
