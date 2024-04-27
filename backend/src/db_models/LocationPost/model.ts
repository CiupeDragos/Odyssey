import mongoose from "mongoose";
import { Coordinates, CoordinatesSchema } from "./Coordinates/model";
import { LocationPoster, LocationPosterSchema } from "./LocationPoster/model";
import { Rating, RatingSchema } from "./Rating/model";
import { TextLocation, TextLocationSchema } from "./TextLocation/model";

enum LocationTypeEnum {
  CULTURAL = "Cultural",
  URBAN = "Urban",
  NATURE = "Nature",
  PANORAMIC = "Panoramic",
}

export interface LocationDbModel {
  title: string;
  postedBy: LocationPoster;
  description: string;
  photos: Array<string>;
  textLocation: TextLocation;
  coordinates: Coordinates;
  categories: Array<LocationTypeEnum>;
  rating: Rating;
}

export type LocationPost = {
  id: string;
  title: string;
  postedBy: LocationPoster;
  description: string;
  photos: Array<string>;
  textLocation: TextLocation;
  coordinates: Coordinates;
  categories: Array<LocationTypeEnum>;
  rating: Rating;
};

const LocationPostSchema = new mongoose.Schema<LocationDbModel>({
  title: { type: String, required: true },
  postedBy: { type: LocationPosterSchema, required: true },
  description: { type: String, required: true },
  photos: { type: [String], required: true },
  textLocation: { type: TextLocationSchema, required: true },
  coordinates: { type: CoordinatesSchema, required: true },
  categories: {
    type: [String],
    enum: Object.values(LocationTypeEnum),
    required: true,
  },
  rating: { type: RatingSchema, required: true },
});

export const LocationPostModel = mongoose.model<LocationDbModel>(
  "location_post",
  LocationPostSchema
);
