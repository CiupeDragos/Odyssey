import { AddLocationRequest } from "../types/request-types";
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
