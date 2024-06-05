import {
  AddTripRequest,
  GetTripsRequest,
  JoinTripRequest,
} from "../types/request-types";
import { Trip } from "../types/response-types";
import { HttpResponse } from "./HttpResponse";
import { genericGetMethod, genericPostMethod } from "./base-methods";

export function addTrip(
  request: AddTripRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(request, "addTrip");
}

export function getTrips(
  posterId?: string,
  participantId?: string
): Promise<HttpResponse<Array<Trip>>> {
  const getTripsRequest: GetTripsRequest = {
    posterId: posterId,
    participantId: participantId,
  };

  return genericGetMethod("getTrips", getTripsRequest);
}

export function joinTrip(
  request: JoinTripRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(request, "joinTrip");
}
