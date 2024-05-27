import { AddCommentRequest } from "../types/request-types";
import { HttpResponse } from "./HttpResponse";
import { genericPostMethod } from "./base-methods";

export function addComment(
  addCommentRequest: AddCommentRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(addCommentRequest, "addComment");
}
