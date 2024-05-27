import { LocationPostModel } from "../../db_models/LocationPost/model";
import { Comment, CommentType } from "./model";
import { AddCommentRequest } from "routes/requests";

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
    return true;
  }
}
