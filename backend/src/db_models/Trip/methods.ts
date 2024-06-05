import { GetTripsRequest } from "routes/requests";
import { Trip, TripDbModel, TripModel } from "./model";

export function addTrip(model: TripDbModel) {
  return new TripModel(model).save();
}

export function getTripById(id: string) {
  return TripModel.findById(id);
}

export function updateTrip(model: TripDbModel, id: string) {
  return TripModel.findByIdAndUpdate(id, model);
}

export function getTrips(getTripsRequest: GetTripsRequest) {
  if (!getTripsRequest.posterId && !getTripsRequest.participantId) {
    return TripModel.find();
  } else if (getTripsRequest.posterId) {
    return TripModel.find({ organizerId: getTripsRequest.posterId });
  } else {
    return TripModel.find({
      participants: {
        $elemMatch: { participantId: getTripsRequest.participantId },
      },
    });
  }
}
