import { StyleSheet, View, Text } from "react-native";
import CustomButton from "../../../common/CustomButton";
import { Colors } from "../../../../util/constants";
import { TextLocation } from "../../../../types/response-types";

type ExactLocationPickerProps = {
  textLocation: TextLocation;
  handleLocationPicking: () => void;
};

function ExactLocationPicker({
  textLocation,
  handleLocationPicking,
}: ExactLocationPickerProps) {
  return (
    <View>
      <View style={styles.pickLocationInnerView}>
        <Text style={styles.pickLocationText}>Exact location:</Text>
        <CustomButton
          customStyle={styles.pickLocationButton}
          color={Colors.secondary}
          outlined
          onTap={handleLocationPicking}
          label="Pick"
          elevated
        />
      </View>

      <View>
        <Text style={styles.locationText}>
          Country:{" "}
          {textLocation.country.length !== 0
            ? textLocation.country
            : "Could not determine the country"}
        </Text>
        <Text style={styles.locationText}>
          Area:{" "}
          {textLocation.area.length !== 0
            ? textLocation.area
            : "Could not determine area"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickLocationText: {
    fontSize: 18,
    marginRight: 12,
  },
  pickLocationInnerView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  pickLocationButton: {
    width: "25%",
  },
  locationText: {
    fontSize: 18,
    marginBottom: 12,
  },
});

export default ExactLocationPicker;
