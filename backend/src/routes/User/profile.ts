import { getUserLocations } from "../../db_models/LocationPost/methods";
import { findUserById } from "../../db_models/User/methods";
import { Request, Response } from "express";
import { ProfileDataRequest } from "routes/requests";
import { ProfileData } from "routes/responses";
import { INVALID_REQUEST_BODY_MESSAGE } from "../../util/constants";
import { isRequestValid } from "../../util/methods";

export const getProfileData = async (req: Request, res: Response) => {
  const profileDataRequest: ProfileDataRequest = {
    userId: req.query.userId as string,
  };

  if (!isRequestValid(profileDataRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const user = await findUserById(profileDataRequest.userId);

  if (!user) {
    res.status(400).send("The user does not exist");
    return;
  }

  const userLocations = await getUserLocations(profileDataRequest.userId);
  const { id, password, ...userProfileData } = user;

  const profileData: ProfileData = {
    ...userProfileData,
    locationPosts: userLocations,
  };

  res.json(profileData);
};
