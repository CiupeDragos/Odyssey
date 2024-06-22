import { LocationDbModel, LocationPost } from "db_models/LocationPost/model";
import { Request, Response } from "express";
import {
  AddLocationRequest,
  LikeLocationRequest,
  LocationPostsRequest,
} from "routes/requests";
import { INVALID_REQUEST_BODY_MESSAGE } from "../../util/constants";
import {
  isRequestValid,
  mapLocationsForRecommendation,
  writePhotosFromBase64,
} from "../../util/methods";
import {
  addLocationPost as addLocationToDb,
  getAllPosts,
  getLikedPosts,
  getLocationsByIds,
  getUserLocations,
  likePost,
} from "../../db_models/LocationPost/methods";

import { exec } from "child_process";

export const addLocationPost = async (req: Request, res: Response) => {
  const addLocationRequest: AddLocationRequest = {
    title: req.body.title,
    description: req.body.description,
    categories: req.body.categories,
    photos: req.body.photos,
    rating: req.body.rating,
    postedBy: req.body.postedBy,
    textLocation: req.body.textLocation,
    coordinates: req.body.coordinates,
  };

  if (!isRequestValid(addLocationRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const photosReferences = writePhotosFromBase64(
    addLocationRequest.photos,
    "public/locations"
  );

  const locationToAdd: LocationDbModel = {
    title: addLocationRequest.title,
    description: addLocationRequest.description,
    categories: addLocationRequest.categories,
    postedBy: addLocationRequest.postedBy,
    textLocation: addLocationRequest.textLocation,
    coordinates: addLocationRequest.coordinates,
    rating: addLocationRequest.rating,
    likes: [],
    comments: [],
    timestamp: new Date().getTime(),
    photos: photosReferences,
  };

  await addLocationToDb(locationToAdd);

  res.send("Location added successfully");
};

export const getLocationPosts = async (req: Request, res: Response) => {
  const getLocationsRequest: LocationPostsRequest = {
    userId: req.query.userId as string,
  };

  if (!getLocationsRequest.userId) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const interactedPostIds = JSON.stringify(
    await getLikedPosts(getLocationsRequest.userId)
  );
  const allPosts = JSON.stringify(
    mapLocationsForRecommendation(await getAllPosts())
  );

  console.log("Liked locations", interactedPostIds);

  const recommendations_command = `python recommendations.py --all_posts "${allPosts.replace(
    /"/g,
    '\\"'
  )}" --interacted_post_ids "${interactedPostIds.replace(/"/g, '\\"')}"`;

  const recommendedPostsIds = await getRecommendedIds(recommendations_command);

  console.log(recommendedPostsIds);

  const locationPosts = await getLocationsByIds(
    recommendedPostsIds ? recommendedPostsIds : []
  );

  locationPosts.sort((a, b) => b.timestamp - a.timestamp);

  res.json(locationPosts);
};

export const likeLocation = async (req: Request, res: Response) => {
  const likeLocationRequest: LikeLocationRequest = {
    userId: req.body.userId,
    locationId: req.body.locationId,
  };

  if (!isRequestValid(likeLocationRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const likeUpdate = await likePost(
    likeLocationRequest.userId,
    likeLocationRequest.locationId
  );

  if (!likeUpdate) {
    res.status(400).send("There was an error when liking this post");
    return;
  }

  res.send("Post liked successfully");
};

function getRecommendedIds(cmd: string): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Stderr: ${stderr}`);
        return;
      }

      try {
        const recommendedPostsIds = JSON.parse(stdout);
        resolve(recommendedPostsIds);
      } catch (e) {
        reject(`Failed to parse JSON output: ${e}`);
      }
    });
  });
}
