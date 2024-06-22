import { User } from "../../db_models/User/model";
import { updateLikes } from "../../db_models/User/methods";
import { LocationDbModel, LocationPost, LocationPostModel } from "./model";
import { Types, type Document } from "mongoose";

type LocationDbDocument = Document<unknown, {}, LocationDbModel> &
  LocationDbModel & {
    _id: Types.ObjectId;
  };

function getLocationPostsFromModels(models: Array<LocationDbDocument>) {
  return models.map((model) => {
    const post: LocationPost = {
      id: model.id,
      title: model.title,
      timestamp: model.timestamp,
      postedBy: model.postedBy,
      description: model.description,
      photos: model.photos,
      textLocation: model.textLocation,
      coordinates: model.coordinates,
      categories: model.categories,
      comments: model.comments,
      likes: model.likes,
      rating: model.rating,
    };

    return post;
  });
}

export async function getLikedPosts(userId: string): Promise<Array<string>> {
  const user = await User.findById(userId);

  if (!user) {
    console.log("[liked-posts] User is null");
    return [];
  }

  return user.likedPosts;
}

export async function getAllPosts() {
  const locationPostsDbModels = await LocationPostModel.find();

  return getLocationPostsFromModels(locationPostsDbModels);
}

export async function getLocationsByIds(
  ids: Array<string>
): Promise<Array<LocationPost>> {
  const locationPostDbModels = await LocationPostModel.find({
    _id: { $in: ids },
  });

  return getLocationPostsFromModels(locationPostDbModels);
}

export async function getUserLocations(
  userId: string
): Promise<Array<LocationPost>> {
  const locationPostDbModels = await LocationPostModel.find({
    "postedBy.userId": userId,
  });

  return getLocationPostsFromModels(locationPostDbModels);
}

export function addLocationPost(locationDbModel: LocationDbModel) {
  return new LocationPostModel(locationDbModel).save();
}

export async function likePost(
  userId: string,
  locationId: string
): Promise<boolean> {
  const curPost = await LocationPostModel.findById(locationId);

  if (!curPost) return false;

  if (curPost.likes.includes(userId)) {
    curPost.likes = curPost.likes.filter((like) => like !== userId);
  } else {
    curPost.likes.push(userId);
  }

  const postUpdateResponse = await LocationPostModel.findByIdAndUpdate(
    locationId,
    curPost
  );
  const userUpdateRepsonse = await updateLikes(userId, locationId);

  if (!postUpdateResponse || !userUpdateRepsonse) return false;

  return true;
}

const LocationPostMethods = {
  getUserLocations: getUserLocations,
  likePost: likePost,
};

export default LocationPostMethods;
