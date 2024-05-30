import { Trip, TripDbModel } from "db_models/Trip/model";
import { Request, Response } from "express";
import {
  AddTripRequest,
  GetTripsRequest,
  JoinTripRequest,
} from "routes/requests";
import { INVALID_REQUEST_BODY_MESSAGE } from "util/constants";
import { isRequestValid } from "util/methods";
import {
  getTripById,
  addTrip as saveTrip,
  updateTrip,
  getTrips as getAllTrips,
} from "db_models/Trip/methods";
import { findUserById } from "db_models/User/methods";

export const addTrip = async (req: Request, res: Response) => {
  const addTripRequest: AddTripRequest = {
    organizerId: req.body.organizerId,
    organizerUsername: req.body.organizerUsername,
    title: req.body.title,
    description: req.body.description,
    participants: req.body.participants,
    visitedCountries: req.body.visitedCountries,
  };

  if (!isRequestValid(addTripRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const tripToAdd: TripDbModel = {
    ...addTripRequest,
  };

  await saveTrip(tripToAdd);

  res.send("Trip added successfully");
};

export const joinTrip = async (req: Request, res: Response) => {
  const joinTripRequest: JoinTripRequest = {
    userId: req.body.userId,
    tripId: req.body.tripId,
    spotIndex: req.body.spotIndex,
  };

  if (!isRequestValid(joinTripRequest)) {
    res.status(400).send(INVALID_REQUEST_BODY_MESSAGE);
    return;
  }

  const user = await findUserById(joinTripRequest.userId);
  const trip = await getTripById(joinTripRequest.tripId);

  if (!user) {
    res.status(400).send("User does not exist");
    return;
  }

  if (!trip) {
    res.status(400).send("Trip does not exist");
    return;
  }

  const spotToOccupy = trip.participants.find(
    (participant) => participant.index === joinTripRequest.spotIndex
  )!!;
  spotToOccupy.participantId = user.id;
  spotToOccupy.participantUsername = user.username;
  spotToOccupy.age = user.birthTimestamp;
  spotToOccupy.gender = user.gender;

  await updateTrip(trip, joinTripRequest.tripId);

  res.send("Trip updated successfully");
};

export const getTrips = async (req: Request, res: Response) => {
  const getTripsRequest: GetTripsRequest = {
    participantId: req.query.participantId as string,
    posterId: req.query.posterId as string,
  };

  const tripsDocuments = await getAllTrips(getTripsRequest);
  const tripsToSend = tripsDocuments.map((doc) => {
    const trip: Trip = {
      id: doc.id,
      organizerId: doc.organizerId,
      organizerUsername: doc.organizerUsername,
      title: doc.title,
      description: doc.description,
      participants: doc.participants,
      visitedCountries: doc.visitedCountries,
    };

    return trip;
  });

  res.json(tripsToSend);
};
