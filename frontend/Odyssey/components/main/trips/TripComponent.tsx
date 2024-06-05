import { Pressable, StyleSheet, Text, View } from "react-native";
import { Trip } from "../../../types/response-types";
import UsernameWithPhoto from "../../common/UsernameWithPhoto";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../../util/constants";
import { getDateFromFromTimestamp } from "../../../util/commonMethods";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavProp } from "../../../types/navigation";

type TripComponentProps = {
  trip: Trip;
};

function TripComponent({ trip }: TripComponentProps) {
  const navigation = useNavigation<MainStackNavProp>();

  const startDate = getDateFromFromTimestamp(trip.startTimestamp);
  const endDate = getDateFromFromTimestamp(trip.endTimestamp);
  const formattedDuration = `${startDate} - ${endDate}`;
  const occupiedSpots = trip.participants.filter(
    (p) => p.participantId.length !== 0
  ).length;
  const formattedSpots = `${occupiedSpots} / ${trip.participants.length}`;

  function goToDetailsPage() {
    navigation.navigate("TripDetails", { trip: trip });
  }

  return (
    <Pressable style={styles.container} onPress={goToDetailsPage}>
      <Text style={styles.titleLabel}>{trip.title}</Text>
      <Text style={styles.descriptionLabel}>{trip.description}</Text>
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
      <View style={styles.userView}>
        <Text style={styles.infoLabel}>Organized by </Text>
        <UsernameWithPhoto
          userId={trip.organizerId}
          username={trip.organizerUsername}
          imgWidth={30}
          imgHeight={30}
          usernameFontSize={16}
          usernameMarginLeft={4}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 24,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 24,
  },
  titleLabel: {
    fontSize: 18,
    fontWeight: "500",
  },
  descriptionLabel: {
    fontSize: 16,
    marginTop: 2,
  },
  iconView: {
    width: 25,
  },
  userView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginLeft: -5,
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
});

export default TripComponent;
