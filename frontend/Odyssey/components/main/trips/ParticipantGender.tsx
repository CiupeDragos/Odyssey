import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons, Foundation } from "@expo/vector-icons";
import { Gender } from "../../../util/enums";

type ParticipantGenderProps = {
  gender: Gender;
  selectedGender: Gender;
  onSelect: () => void;
};

function ParticipantGender({
  gender,
  selectedGender,
  onSelect,
}: ParticipantGenderProps) {
  let icon = <Foundation name="male-female" size={30} color="gray" />;

  if (gender === Gender.MAN) {
    icon = <Ionicons name="man" size={28} color="gray" />;
  } else if (gender === Gender.WOMAN) {
    icon = <Ionicons name="woman" size={28} color="gray" />;
  }

  return (
    <Pressable
      style={[
        styles.genderContainer,
        selectedGender === gender && styles.selected,
      ]}
      onPress={onSelect}
    >
      <Text style={styles.genderLabel}>{gender}</Text>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  genderLabel: {
    fontSize: 14,
    marginRight: 4,
  },
  selected: {
    backgroundColor: "lightgray",
  },
});

export default ParticipantGender;
