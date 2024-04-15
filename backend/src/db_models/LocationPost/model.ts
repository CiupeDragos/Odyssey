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

export interface LocationPost {
  title: string;
  postedBy: LocationPoster;
  description: string;
  photos: Array<string>;
  textLocation: TextLocation;
  coordinates: Coordinates;
  categories: Array<LocationTypeEnum>;
  rating: Rating;
}

const LocationPostSchema = new mongoose.Schema<LocationPost>({
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

export const LocationPost = mongoose.model<LocationPost>(
  "location_post",
  LocationPostSchema
);
