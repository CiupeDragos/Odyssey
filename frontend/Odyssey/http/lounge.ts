import {
  AddCommentRequest,
  AddLoungeThreadRequest,
  AddThreadReplyRequest,
  AddTripMessageRequest,
  GetLoungeThreadsRequest,
} from "../types/request-types";
import { LoungeThread } from "../types/response-types";
import { HttpResponse } from "./HttpResponse";
import { genericGetMethod, genericPostMethod } from "./base-methods";

export function addComment(
  addCommentRequest: AddCommentRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(addCommentRequest, "addComment");
}

export function addTripMessage(
  addTripMessageRequest: AddTripMessageRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(addTripMessageRequest, "addTripChat");
}

export function addThreadReply(
  addThreadReplyRequest: AddThreadReplyRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(addThreadReplyRequest, "addThreadReply");
}

export function addThread(
  addThreadRequest: AddLoungeThreadRequest
): Promise<HttpResponse<string>> {
  return genericPostMethod(addThreadRequest, "addThread");
}

export function getThreads(
  authorId?: string
): Promise<HttpResponse<Array<LoungeThread>>> {
  const queryParams: GetLoungeThreadsRequest = {
    authorId: authorId,
  };

  return genericGetMethod("getThreads", queryParams);
}
