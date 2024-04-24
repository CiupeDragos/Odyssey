import { useState } from "react";
import { Modal, StyleSheet, View, Text, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../../util/constants";
import VisitedCountriesContent from "./VisitedCountriesContent";

type VisitedCountriesProps = {
  visitedCountries: Array<string>;
  editMode?: true;
  onUpdate?: (countries: Array<string>) => void;
};

function VisitedCountries({
  visitedCountries,
  editMode,
  onUpdate,
}: VisitedCountriesProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function toggleModal(value: boolean) {
    setIsModalVisible(value);
  }

  return (
    <View style={styles.countriesCount}>
      <Text style={styles.visitedCountriesText}>Visited countries:</Text>
      <Text style={styles.visitedCountriesCount}>
        {visitedCountries.length}
      </Text>
      <Pressable
        onPress={() => {
          toggleModal(true);
        }}
      >
        <FontAwesome5 name="map-marked-alt" size={24} color={Colors.primary} />
      </Pressable>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.centeredView}>
          <View style={styles.modalContainer}>
            <VisitedCountriesContent
              visitedCountries={visitedCountries}
              onUpdate={onUpdate}
              editMode={editMode}
              closeModal={() => {
                toggleModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  countriesCount: {
    flexDirection: "row",
    alignItems: "center",
  },
  visitedCountriesText: {
    fontSize: 18,
    marginRight: 8,
    marginTop: 3,
  },
  visitedCountriesCount: {
    fontSize: 18,
    marginRight: 12,
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "80%",
    height: "60%",
    borderRadius: 12,
  },
  modalText: {},
});

export default VisitedCountries;
function rgba(): any {
  throw new Error("Function not implemented.");
}
