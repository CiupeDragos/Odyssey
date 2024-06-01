import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TripParticipant } from "../../../types/response-types";
import { Gender } from "../../../util/enums";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ParticipantGender from "./ParticipantGender";

type ParticipantComponentProps = {
  participant: TripParticipant;
  onUpdateParticipant: (participant: TripParticipant) => void;
};

function ParticipantConfigurator({
  participant,
  onUpdateParticipant,
}: ParticipantComponentProps) {
  function handleFieldChange(field: string, value: number | Gender) {
    participant = { ...participant, [field]: value };

    onUpdateParticipant(participant);
  }

  return (
    <View style={styles.container}>
      <View style={styles.spotView}>
        <Text style={styles.spotLabel}>Spot #{participant.index + 1}</Text>
      </View>
      <View style={styles.genderView}>
        <Text style={styles.genderFieldLabel}>Gender: </Text>
        <ScrollView
          contentContainerStyle={styles.genderScrollContainer}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <ParticipantGender
            gender={Gender.ANY}
            selectedGender={participant.gender}
            onSelect={() => handleFieldChange("gender", Gender.ANY)}
          />
          <ParticipantGender
            gender={Gender.MAN}
            selectedGender={participant.gender}
            onSelect={() => handleFieldChange("gender", Gender.MAN)}
          />
          <ParticipantGender
            gender={Gender.WOMAN}
            selectedGender={participant.gender}
            onSelect={() => handleFieldChange("gender", Gender.WOMAN)}
          />
        </ScrollView>
      </View>
      <View style={styles.participantsView}>
        <Text style={styles.participantsLabel}>Minimum age:</Text>
        <TextInput
          style={styles.participantCountInput}
          inputMode="decimal"
          onChangeText={(text) => handleFieldChange("minAge", parseInt(text))}
        />
      </View>
      <View style={styles.participantsView}>
        <Text style={styles.participantsLabel}>Maximum age:</Text>
        <TextInput
          style={styles.participantCountInput}
          inputMode="decimal"
          onChangeText={(text) => handleFieldChange("maxAge", parseInt(text))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 24,
  },
  genderView: {
    flexDirection: "row",
    alignItems: "center",
  },
  participantsLabel: {
    fontSize: 18,
  },
  participantCountInput: {
    width: 30,
    marginLeft: 8,
    padding: 2,
    borderBottomWidth: 1,
    fontSize: 18,
  },
  genderScrollContainer: {},
  spotLabel: {
    fontSize: 18,
    fontWeight: "400",
  },
  spotView: {
    marginBottom: 16,
  },
  genderContainer: {
    flexDirection: "row",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    borderWidth: 1,
    padding: 4,
    borderColor: "gray",
    marginRight: 8,
  },
  genderFieldLabel: {
    fontSize: 18,
    marginRight: 4,
  },
  genderLabel: {
    fontSize: 14,
    marginRight: 4,
  },
  selected: {
    backgroundColor: "lightgray",
  },
  participantsView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
});

export default ParticipantConfigurator;
