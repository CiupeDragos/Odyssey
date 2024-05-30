import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gender } from "../../util/enums";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../util/constants";

type GenderPickerProps = {
  onPickGender: (gender: Gender) => void;
  errorText: string;
  selectedGender?: Gender;
};

function GenderPicker({
  onPickGender,
  errorText,
  selectedGender,
}: GenderPickerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Pressable
          style={[
            styles.genderContainer,
            selectedGender === Gender.MAN && styles.selected,
          ]}
          onPress={() => onPickGender(Gender.MAN)}
        >
          <Text style={styles.genderLabel}>{Gender.MAN}</Text>
          <Ionicons name="man" size={32} color="gray" />
        </Pressable>
        <Pressable
          style={[
            styles.genderContainer,
            selectedGender === Gender.WOMAN && styles.selected,
          ]}
          onPress={() => onPickGender(Gender.WOMAN)}
        >
          <Text style={styles.genderLabel}>{Gender.WOMAN}</Text>
          <Ionicons name="woman" size={32} color="gray" />
        </Pressable>
      </View>
      {errorText.length !== 0 && (
        <Text style={styles.errorLabel}>{errorText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderContainer: {
    flexDirection: "row",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    borderWidth: 1,
    padding: 8,
    borderColor: "gray",
  },
  genderLabel: {
    fontSize: 18,
    marginRight: 4,
  },
  errorLabel: {
    marginTop: 4,
    marginStart: 2,
    color: Colors.errorText,
  },
  selected: {
    backgroundColor: "lightgray",
  },
});

export default GenderPicker;
