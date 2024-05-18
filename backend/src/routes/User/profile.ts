import { getLocations } from "../../db_models/LocationPost/methods";
import {
  findUserById,
  updateFollowers,
  updateUserProfileData,
} from "../../db_models/User/methods";
import { Request, Response } from "express";
import {
  FollowUserRequest,
  ProfileDataRequest,
  ProfileUpdateRequest,
} from "routes/requests";
import { ProfileData } from "routes/responses";
import { INVALID_REQUEST_BODY_MESSAGE } from "../../util/constants";
import { isRequestValid } from "../../util/methods";
import fs from "fs";

export const getProfileData = async (req: Request, res: Response) => {
  const profileDataRequest: ProfileDataRequest = {
    userId: req.query.userId as string,
    requesterId: req.query.requesterId as string,
  };

  if (!isRequestValid(profileDataRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const user = await findUserById(profileDataRequest.userId);
  const requester = await findUserById(profileDataRequest.requesterId);

  if (!user || !requester) {
    res.status(400).send("One of the users does not exist");
    return;
  }

  const userLocations = await getLocations(profileDataRequest.userId);
  const { id, password, ...userProfileData } = user;

  const profileData: ProfileData = {
    ...userProfileData,
    requesterFollowing: requester.following,
    locationPosts: userLocations,
  };

  res.json(profileData);
};

export const updateProfileData = async (req: Request, res: Response) => {
  const profileUpdateRequest: ProfileUpdateRequest = {
    userId: req.body.userId,
    base64Photo: req.body.base64Photo,
    country: req.body.country,
    favoriteCountry: req.body.favoriteCountry,
    visitedCountries: req.body.visitedCountries,
    description: req.body.description,
  };

  if (!isRequestValid(profileUpdateRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const user = await findUserById(profileUpdateRequest.userId);
  if (!user) {
    res.status(400).send("The user does not exist");
    return;
  }

  const userUpdate = await updateUserProfileData(profileUpdateRequest);

  if (!userUpdate) {
    res.status(400).send("User update failed");
    return;
  }

  if (profileUpdateRequest.base64Photo.length === 0) {
    res.send("Profile updated successfully");
    return;
  }
  /*
   There should be more error handling,maybe reverse the data update if image update fails,
   also don't send success response even if photo update fails
  */
  const base64ProfileImage = profileUpdateRequest.base64Photo;

  const dataWithoutPrefix = base64ProfileImage.replace(
    /^data:image\/\w+;base64,/,
    ""
  );
  const buffer = Buffer.from(dataWithoutPrefix, "base64");
  const filePath = `public/profile/${profileUpdateRequest.userId}.jpg`;

  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Image saved successfully!");
    }
  });

  res.send("Profile data updated successfully");
};

export const followUser = async (req: Request, res: Response) => {
  const followUserRequest: FollowUserRequest = {
    fromUserId: req.body.fromUserId,
    toUserId: req.body.toUserId,
  };

  if (!isRequestValid(followUserRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const fromUser = await findUserById(followUserRequest.fromUserId);
  const toUser = await findUserById(followUserRequest.toUserId);

  if (!fromUser || !toUser) {
    res.status(400).send("One of the users does not exist");
    return;
  }

  const following = !!fromUser.following.find((f) => f.userId === toUser.id);

  if (following) {
    fromUser.following = fromUser.following.filter(
      (f) => f.userId !== toUser.id
    );

    toUser.followers = toUser.followers.filter((f) => f.userId !== fromUser.id);
  } else {
    fromUser.following.push({ userId: toUser.id, username: toUser.username });
    toUser.followers.push({ userId: fromUser.id, username: fromUser.username });
  }

  const updateFollowingRequest = await updateFollowers(fromUser, toUser);
  if (!updateFollowingRequest) {
    res.status(400).send("Failed to update followers");
    return;
  }

  res.send("Followers updated successfully");
};
