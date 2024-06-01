import { AddTripRequest } from "../types/request-types";
import { HttpResponse } from "./HttpResponse";
import { genericPostMethod } from "./base-methods";

export function addTrip(
  request: AddTripRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(request, "addTrip");
}
