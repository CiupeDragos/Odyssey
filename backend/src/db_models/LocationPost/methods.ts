import { LocationPost, LocationPostModel } from "./model";

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
      postedBy: model.postedBy,
      description: model.description,
      photos: model.photos,
      textLocation: model.textLocation,
      coordinates: model.coordinates,
      categories: model.categories,
      rating: model.rating,
    };

    return post;
  });

  return locationPosts;
}

const LocationPostMethods = {
  getUserLocations: getUserLocations,
};

export default LocationPostMethods;
