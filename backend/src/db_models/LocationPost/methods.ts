import { LocationDbModel, LocationPost, LocationPostModel } from "./model";

export async function getUserLocations(
  userId: string
): Promise<Array<LocationPost>> {
  const locationPostDbModels = await LocationPostModel.find({
    "postedBy.userId": userId,
  });

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

const LocationPostMethods = {
  getUserLocations: getUserLocations,
};

export default LocationPostMethods;
