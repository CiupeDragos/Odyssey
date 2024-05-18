import { LocationDbModel } from "db_models/LocationPost/model";
import { Request, Response } from "express";
import { AddLocationRequest, LocationPostsRequest } from "routes/requests";
import { INVALID_REQUEST_BODY_MESSAGE } from "../../util/constants";
import { isRequestValid, writePhotosFromBase64 } from "../../util/methods";
import {
  addLocationPost as addLocationToDb,
  getLocations,
} from "../../db_models/LocationPost/methods";

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
    posterId: req.query.posterId as string,
  };

  const locationPosts = await getLocations(getLocationsRequest.posterId);
  locationPosts.sort((a, b) => b.timestamp - a.timestamp);

  res.json(locationPosts);
};
