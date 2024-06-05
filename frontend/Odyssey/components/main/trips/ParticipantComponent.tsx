import { StyleSheet, View, Text } from "react-native";
import { TripParticipant } from "../../../types/response-types";
import UsernameWithPhoto from "../../common/UsernameWithPhoto";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { Gender } from "../../../util/enums";
import { getYearsFromTimestamp } from "../../../util/commonMethods";

type ParticipantComponentProps = {
  participant: TripParticipant;
};

function ParticipantComponent({ participant }: ParticipantComponentProps) {
  const isSpotFree = participant.participantId.length === 0;
  let icon;

  if (participant.requiredGender === Gender.MAN) {
    icon = (
      <View style={styles.genderView}>
        <Ionicons name="man" size={30} color="gray" />
      </View>
    );
  } else if (participant.requiredGender === Gender.WOMAN) {
    icon = (
      <View style={styles.genderView}>
        <Ionicons name="woman" size={30} color="gray" />
      </View>
    );
  } else if (participant.requiredGender === Gender.ANY && isSpotFree) {
    icon = <Foundation name="male-female" size={32} color="gray" />;
  } else if (participant.gender === Gender.MAN) {
    icon = (
      <View style={styles.genderView}>
        <Ionicons name="man" size={30} color="gray" />
      </View>
    );
  } else {
    icon = (
      <View style={styles.genderView}>
        <Ionicons name="woman" size={30} color="gray" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UsernameWithPhoto
        userId={participant.participantId}
        username={isSpotFree ? "Free spot" : participant.participantUsername}
        imgWidth={35}
        imgHeight={35}
        usernameFontSize={20}
        usernameMarginLeft={12}
      />
      <View style={styles.infoView}>
        <Text style={styles.infoLabel}>
          Gender: {isSpotFree ? participant.requiredGender : participant.gender}
        </Text>
        {icon}
      </View>
      {isSpotFree && (
        <Text style={styles.ageLabel}>
          Minimum age: {participant.minAge === 0 ? "none" : participant.minAge}
        </Text>
      )}
      {isSpotFree && (
        <Text style={styles.ageLabel}>
          Maximum age: {participant.maxAge === 0 ? "none" : participant.maxAge}
        </Text>
      )}
      {!isSpotFree && (
        <Text style={styles.ageLabel}>Age: {participant.age}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "white",
    borderRadius: 24,
    marginBottom: 24,
    padding: 8,
  },
  infoView: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 18,
    marginRight: 4,
  },
  genderView: {
    marginLeft: -6,
  },
  ageLabel: {
    fontSize: 18,
    marginTop: 2,
    marginBottom: 2,
  },
});

export default ParticipantComponent;
