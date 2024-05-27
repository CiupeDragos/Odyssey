import { CommentType } from "../../db_models/Comment/model";
import {
  getComments as getData,
  addComment as addData,
} from "../../db_models/Comment/methods";
import { Request, Response } from "express";
import { INVALID_REQUEST_BODY_MESSAGE } from "../../util/constants";
import { AddCommentRequest, AddLoungeThreadRequest } from "routes/requests";
import { isRequestValid } from "../../util/methods";
import { LoungeThreadDbModel } from "../../db_models/LoungeThread/model";
import {
  addThread as addNewThread,
  getThreads as getAllThreads,
} from "../../db_models/LoungeThread/methods";

export const addComment = async (
  req: Request,
  res: Response,
  queryFor: CommentType
) => {
  const addCommentRequest: AddCommentRequest = {
    authorId: req.body.authorId,
    authorUsername: req.body.authorUsername,
    content: req.body.content,
    timestamp: req.body.timestamp,
    modelId: "",
  };

  if (queryFor === "Location") {
    addCommentRequest.modelId = req.body.locationId;
  } else {
    addCommentRequest.modelId = req.body.loungeThreadId;
  }

  if (!isRequestValid(addCommentRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const updateResponse = await addData(addCommentRequest, queryFor);

  if (!updateResponse) {
    res.status(400).send("There was an error when saving the data");
    return;
  }

  res.send("Data added successfully");
};

export const getComments = async (
  req: Request,
  res: Response,
  queryFor: CommentType
) => {
  let queryId: string;

  if (queryFor === "Location") {
    queryId = req.query.locationId as string;
  } else {
    queryId = req.query.loungeThreadId as string;
  }

  if (queryId === undefined) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const comments = await getData(queryId, queryFor);

  if (!comments) {
    res.status(400).send("There was an error when querying the data");
    return;
  }

  res.json(comments);
};

export const getThreads = async (req: Request, res: Response) => {
  const threadAuthorId: string | undefined = req.query.authorId as string;

  const threads = getAllThreads(threadAuthorId);

  res.json(threads);
};

export const addThread = async (req: Request, res: Response) => {
  const addThreadRequest: AddLoungeThreadRequest = {
    threadType: req.body.threadType,
    authorId: req.body.authorId,
    authorUsername: req.body.authorUsername,
    title: req.body.title,
    content: req.body.content,
  };

  if (!isRequestValid(addThreadRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const newThread: LoungeThreadDbModel = {
    ...addThreadRequest,
    answers: [],
    timestamp: new Date().getTime(),
  };

  await addNewThread(newThread);

  res.send("Thread added successfully");
};
