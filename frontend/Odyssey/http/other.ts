import { SearchUsersRequest } from "../types/request-types";
import { Follower } from "../types/response-types";
import { HttpResponse } from "./HttpResponse";
import { genericGetMethod } from "./base-methods";

export function searchForUsers(
  searchQuery: string
): Promise<HttpResponse<Array<Follower>>> {
  const searchRequest: SearchUsersRequest = {
    searchQuery: searchQuery,
  };

  return genericGetMethod("searchForUsers", searchRequest);
}
