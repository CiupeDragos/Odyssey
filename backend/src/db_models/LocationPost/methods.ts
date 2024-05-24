import { updateLikes } from "../../db_models/User/methods";
import { LocationDbModel, LocationPost, LocationPostModel } from "./model";

export async function getLocations(
  userId?: string
): Promise<Array<LocationPost>> {
  let locationPostDbModels;

  if (userId) {
    locationPostDbModels = await LocationPostModel.find({
      "postedBy.userId": userId,
    });
  } else {
    locationPostDbModels = await LocationPostModel.find();
  }

  const locationPosts = locationPostDbModels.map((model) => {
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

  return locationPosts;
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
  getUserLocations: getLocations,
  likePost: likePost,
};

export default LocationPostMethods;
