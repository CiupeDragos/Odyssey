import { Request, Response } from "express";
import { SearchUsersRequest } from "routes/requests";
import { INVALID_REQUEST_BODY_MESSAGE } from "../../util/constants";
import { isRequestValid } from "../../util/methods";
import { searchForUsers as searchUsers } from "../../db_models/User/methods";

export const searchForUsers = async (req: Request, res: Response) => {
  const searchUsersRequest: SearchUsersRequest = {
    searchQuery: req.query.searchQuery as string,
  };

  if (!isRequestValid(searchUsersRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const users = await searchUsers(searchUsersRequest.searchQuery);

  res.json(users);
};
