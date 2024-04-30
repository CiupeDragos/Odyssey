import { StyleSheet, View } from "react-native";
import {
  Coordinates,
  Rating,
  TextLocation,
} from "../../../types/response-types";
import { LocationTypeEnum } from "../../../util/enums";
import { useState } from "react";
import Input from "../../../components/common/Input";
import { Colors } from "../../../util/constants";
import LocationPhotosPicker from "../../../components/main/home/addLocation/LocationPhotosPicker";

type AddLocationFields = {
  title: string;
  description: string;
  photos: Array<string>;
  coordinates: Coordinates;
  categories: Array<LocationTypeEnum>;
  textLocation: TextLocation;
  rating: Rating;
};

const defaultLocationFields: AddLocationFields = {
  title: "",
  description: "",
  photos: [],
  categories: [],
  coordinates: { lat: 0, long: 0 },
  textLocation: { country: "", city: "" },
  rating: { safe: 0, fun: 0, crowded: 0, expensive: 0 },
};

type LocationInputFields =
  | "title"
  | "description"
  | "photos"
  | "categories"
  | "coordinates"
  | "textLocation"
  | "rating";

type LocationInputValues =
  | string
  | Array<string>
  | Coordinates
  | TextLocation
  | Rating;

function AddLocationScreen() {
  const [locationFields, setLocationFields] = useState(defaultLocationFields);

  function handleInputChange(
    field: LocationInputFields,
    value: LocationInputValues
  ) {
    setLocationFields((curFields) => ({
      ...curFields,
      [field]: value,
    }));
  }

  console.log(locationFields.title, locationFields.photos.length);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <LocationPhotosPicker
          photos={locationFields.photos}
          onUpdatePhotos={(photos) => handleInputChange("photos", photos)}
        />
        <Input
          flat
          label="Location title"
          placeholder="Enter the location title"
          onChangeText={(title) => handleInputChange("title", title)}
          borderRadius={24}
          borderWidth={1}
          borderColor={Colors.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  innerContainer: {
    width: "80%",
    height: "95%",
  },
});

export default AddLocationScreen;
