import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import CustomButton from "../../common/CustomButton";
import { Colors } from "../../../util/constants";
import HorizontalRule from "../../common/HorizontalRule";
import Input from "../../common/Input";
import { useState } from "react";
import VisitedCountryItem from "./VistitedCountryItem";

type VisitedCountriesContentProps = {
  visitedCountries: Array<string>;
  onUpdate?: (countries: Array<string>) => void;
  closeModal: () => void;
  editMode?: true;
};

function VisitedCountriesContent({
  visitedCountries,
  editMode,
  onUpdate,
  closeModal,
}: VisitedCountriesContentProps) {
  const [country, setCountry] = useState("");
  const [addError, setAddError] = useState<string>();

  function handleCountryTextChange(newCountry: string) {
    setCountry(newCountry);
  }

  function addCountry() {
    if (country.length === 0) {
      setAddError("Country can't be empty");
      return;
    }

    if (visitedCountries.includes(country)) {
      setAddError("Country already exists");
      return;
    }

    setAddError(undefined);
    setCountry("");

    visitedCountries = [country, ...visitedCountries];
    onUpdate!!(visitedCountries);
  }

  function deleteCountry(country: string) {
    visitedCountries = visitedCountries.filter(
      (curCountry) => curCountry !== country
    );

    onUpdate!!(visitedCountries);
  }

  const header = !editMode ? (
    <Text style={styles.visitedCountriesText}>Visited countries</Text>
  ) : (
    <>
      <Input
        label="New country"
        onChangeText={handleCountryTextChange}
        customStyle={styles.input}
        height={30}
        value={country}
      />
      {addError && <Text style={styles.errorText}>{addError}</Text>}
      <CustomButton
        color={Colors.secondary}
        label="Add"
        onTap={addCountry}
        customStyle={styles.addButton}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>{header}</View>
      <HorizontalRule />
      <View style={styles.listView}>
        <FlatList
          data={visitedCountries}
          renderItem={({ item }) => (
            <VisitedCountryItem
              country={item}
              onDelete={() => deleteCountry(item)}
              editMode={editMode}
            />
          )}
        />
      </View>
      <View style={styles.buttonView}>
        <CustomButton
          color={Colors.secondary}
          label="Close"
          onTap={closeModal}
          customStyle={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 8,
    justifyContent: "center",
  },
  input: {
    width: "60%",
  },
  visitedCountriesText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  listView: {
    flex: 1,
    padding: 12,
  },
  buttonView: {
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 12,
  },
  button: {
    width: "60%",
  },
  addButton: {
    width: "60%",
    marginTop: 4,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.errorText,
  },
});

export default VisitedCountriesContent;
