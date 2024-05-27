import { getThread } from "../../db_models/LoungeThread/methods";
import { LocationPostModel } from "../../db_models/LocationPost/model";
import { Comment, CommentType } from "./model";
import { AddCommentRequest } from "routes/requests";
import { LoungeThreadModel } from "../../db_models/LoungeThread/model";

export async function getComments(queryId: string, queryFor: CommentType) {
  if (queryFor === "Location") {
    const location = await LocationPostModel.findById(queryId);

    return location?.comments ?? null;
  } else {
    return [];
  }
}

export async function addComment(
  addCommentRequest: AddCommentRequest,
  queryFor: CommentType
) {
  const commentToAdd: Comment = {
    authorId: addCommentRequest.authorId,
    authorUsername: addCommentRequest.authorUsername,
    timestamp: addCommentRequest.timestamp,
    content: addCommentRequest.content,
  };

  if (queryFor === "Location") {
    const location = await LocationPostModel.findById(
      addCommentRequest.modelId
    );

    if (!location) return false;

    location.comments.push(commentToAdd);
    const updateResponse = await LocationPostModel.findByIdAndUpdate(
      addCommentRequest.modelId,
      location
    );

    if (!updateResponse) return false;

    return true;
  } else {
    const thread = await getThread(addCommentRequest.modelId);

    if (!thread) return false;

    thread.answers.push(commentToAdd);
    const updateResponse = await LoungeThreadModel.findByIdAndUpdate(
      addCommentRequest.modelId,
      thread
    );

    if (!updateResponse) return false;

    return true;
  }
}
