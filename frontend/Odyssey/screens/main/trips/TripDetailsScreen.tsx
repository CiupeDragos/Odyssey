import { useRoute } from "@react-navigation/native";
import { StyleSheet, View, Text, Alert } from "react-native";
import { TripDetailsRouteProp } from "../../../types/navigation";
import { Colors } from "../../../util/constants";
import {
  getDateFromFromTimestamp,
  getYearsFromTimestamp,
} from "../../../util/commonMethods";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import UsernameWithPhoto from "../../../components/common/UsernameWithPhoto";
import VisitedCountries from "../../../components/main/profile/VisitedCountries";
import ParticipantsList from "../../../components/main/trips/ParticipantsList";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../../components/common/CustomButton";
import { useContext, useState } from "react";
import { MainContext } from "../../../store/MainContext";
import { Gender } from "../../../util/enums";
import { TripParticipant } from "../../../types/response-types";
import { JoinTripRequest } from "../../../types/request-types";
import { joinTrip as joinTripPost } from "../../../http/trips";
import { HttpResponse } from "../../../http/HttpResponse";

function TripDetailsScreen() {
  const mainContext = useContext(MainContext);
  const route = useRoute<TripDetailsRouteProp>();
  const trip = route.params.trip;
  const [participants, setParticipants] = useState(trip.participants);

  const startDate = getDateFromFromTimestamp(trip.startTimestamp);
  const endDate = getDateFromFromTimestamp(trip.endTimestamp);
  const formattedDuration = `${startDate} - ${endDate}`;
  const occupiedSpots = participants.filter(
    (p) => p.participantId.length !== 0
  ).length;
  const formattedSpots = `${occupiedSpots} / ${participants.length}`;
  const userAge = getYearsFromTimestamp(mainContext.userData!!.birthTimestamp);
  const userGender = mainContext.userData!!.gender;
  const didUserJoin =
    participants.find((p) => p.participantId === mainContext.userData!!.id) !==
    undefined;

  async function joinTrip(index: number) {
    const joinTripRequest: JoinTripRequest = {
      tripId: trip.id,
      userId: mainContext.userData!!.id,
      spotIndex: index,
    };

    const response = await joinTripPost(joinTripRequest);

    if (HttpResponse.isError(response)) {
      Alert.alert("An error occurred", response.error);
    }
  }

  function handleJoinTrip() {
    if (didUserJoin) {
      const userSpot = participants.find(
        (p) => p.participantId === mainContext.userData!!.id
      )!!;
      const updatedUserSpot: TripParticipant = {
        ...userSpot,
        participantId: "",
        participantUsername: "",
        age: 0,
      };
      const spotIndex = participants.findIndex(
        (p) => p.participantId === userSpot.participantId
      );

      const updatedParticipants = [...participants];
      updatedParticipants[spotIndex] = updatedUserSpot;

      setParticipants(updatedParticipants);
      joinTrip(userSpot.index);
      return;
    }

    const freeSpot = participants.find(
      (participant) =>
        participant.participantId.length === 0 &&
        participant.minAge <= userAge &&
        (participant.maxAge >= userAge || participant.maxAge === 0) &&
        (participant.requiredGender === Gender.ANY ||
          participant.requiredGender === userGender)
    );

    if (!freeSpot) {
      Alert.alert(
        "You can't join this trip",
        "You do not meet the requirements for any spot, or there is no free spot available"
      );
      return;
    }

    const updatedParticipants = [...participants];
    const updatedParticipant: TripParticipant = {
      ...freeSpot,
      participantId: mainContext.userData!!.id,
      participantUsername: mainContext.userData!!.username,
      gender: mainContext.userData!!.gender,
      age: userAge,
    };

    const spotIndex = updatedParticipants.findIndex(
      (p) => p.index === freeSpot.index
    );
    updatedParticipants[spotIndex] = updatedParticipant;

    setParticipants(updatedParticipants);
    joinTrip(freeSpot.index);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleLabel}>{trip.title}</Text>
      <Text style={styles.descriptionLabel}>{trip.description}</Text>
      <View style={styles.userView}>
        <View style={{ flex: 2 }}></View>
        <Text style={styles.infoLabel}>By </Text>
        <UsernameWithPhoto
          userId={trip.organizerId}
          username={trip.organizerUsername}
          imgWidth={25}
          imgHeight={25}
          usernameFontSize={16}
          usernameMarginLeft={4}
        />
      </View>
      <View style={styles.countriesView}>
        <VisitedCountries visitedCountries={trip.visitedCountries} />
      </View>
      <View style={styles.infoView}>
        <View style={styles.iconView}>
          <Ionicons name="calendar" size={24} color={Colors.primary} />
        </View>
        <Text style={styles.infoLabel}>{formattedDuration}</Text>
      </View>
      <View style={styles.infoView}>
        <View style={styles.iconView}>
          <FontAwesome name="group" size={24} color={Colors.primary} />
        </View>
        <Text style={styles.infoLabel}>{formattedSpots}</Text>
      </View>
      <View style={styles.listContainer}>
        <CustomButton
          color={Colors.secondary}
          label={!didUserJoin ? "Join trip" : "Quit trip"}
          onTap={handleJoinTrip}
          customStyle={styles.joinButton}
        />
        <ParticipantsList participants={participants} viewOnly />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  titleLabel: {
    fontSize: 18,
    fontWeight: "500",
  },
  descriptionLabel: {
    fontSize: 16,
    marginTop: 2,
  },
  participantsLabel: {
    fontSize: 18,
    marginRight: 4,
  },
  countriesView: {
    marginTop: 12,
  },
  iconView: {
    width: 25,
  },
  userView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginLeft: -5,
    justifyContent: "flex-end",
  },
  infoView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  infoLabel: {
    fontSize: 16,
    marginLeft: 4,
  },
  listContainer: {
    alignItems: "center",
  },
  joinButton: {
    width: "60%",
    marginTop: 12,
  },
});

export default TripDetailsScreen;
