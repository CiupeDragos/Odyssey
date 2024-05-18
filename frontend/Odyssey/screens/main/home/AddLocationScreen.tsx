import { Alert, StyleSheet, View } from "react-native";
import {
  Coordinates,
  Rating,
  TextLocation,
} from "../../../types/response-types";
import { LocationTypeEnum } from "../../../util/enums";
import { useContext, useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import { Colors } from "../../../util/constants";
import LocationPhotosPicker from "../../../components/main/home/addLocation/LocationPhotosPicker";
import CustomButton from "../../../components/common/CustomButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AddLocationNavProp,
  AddLocationRouteProp,
} from "../../../types/navigation";
import {
  LocationObject,
  PermissionStatus,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import ExactLocationPicker from "../../../components/main/home/addLocation/ExactLocationPicker";
import LoadingOverlay from "../../../components/common/LoadingOverlay";
import LocationCategoriesPicker from "../../../components/main/home/addLocation/LocationCategoriesPicker";
import LocationRatingPicker from "../../../components/main/home/addLocation/LocationRatingPicker";
import KeyboardAvoidingContainer from "../../../components/common/KeyboardAvoidingContainer";
import ErrorText from "../../../components/common/ErrorText";
import { validateLocationTitle } from "../../../util/credentialsValidation";
import { AddLocationRequest } from "../../../types/request-types";
import { addLocationPost } from "../../../http/home-methods";
import { HttpResponse } from "../../../http/HttpResponse";
import { MainContext } from "../../../store/MainContext";

type AddLocationFields = {
  title: string;
  description: string;
  photos: Array<string>;
  coordinates: Coordinates;
  categories: Array<LocationTypeEnum>;
  textLocation: TextLocation;
  rating: Rating;
};

type AddLocationErrors = {
  title: string;
  photos: string;
  categories: string;
  textLocation: string;
};

const defaultLocationFields: AddLocationFields = {
  title: "",
  description: "",
  photos: [],
  categories: [],
  coordinates: { lat: 0, long: 0 },
  textLocation: {
    country: "you need to pick a location",
    area: "you need to pick a location",
  },
  rating: { safe: 0, fun: 0, uncrowded: 0, affordable: 0 },
};

const defaultErrorFields: AddLocationErrors = {
  title: "",
  photos: "",
  categories: "",
  textLocation: "",
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
  const [locationErrors, setLocationErrors] = useState(defaultErrorFields);
  const [waitingForLocation, setWaitingForLocation] = useState(false);
  const [localizationPromise, setLocalizationPromise] =
    useState<Promise<LocationObject>>();
  const [isUserSliding, setIsUserSliding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mainContext = useContext(MainContext);

  const navigation = useNavigation<AddLocationNavProp>();
  const route = useRoute<AddLocationRouteProp>();

  function toggleUserSliding(value: boolean) {
    setIsUserSliding(value);
  }

  async function verifyLocationPermission() {
    const permissionResponse = await requestForegroundPermissionsAsync();

    if (permissionResponse.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permissions to use this app"
      );

      return false;
    }

    return true;
  }

  async function handleUserLocalization() {
    console.log("Started localizing");
    const hasLocationPermissions = await verifyLocationPermission();
    if (!hasLocationPermissions) return;

    const localizationPromise = getCurrentPositionAsync();
    setLocalizationPromise(localizationPromise);
    const location = await localizationPromise;
    const userCoordinates: Coordinates = {
      lat: location.coords.latitude,
      long: location.coords.longitude,
    };

    console.log("Location fetched");
    handleInputChange("coordinates", userCoordinates);
    setLocalizationPromise(undefined);
  }

  function handleInputChange(
    field: LocationInputFields,
    value: LocationInputValues
  ) {
    setLocationFields((curFields) => ({
      ...curFields,
      [field]: value,
    }));
  }

  function validateLocationData() {
    const { country, area } = locationFields.textLocation;
    const titleError = validateLocationTitle(locationFields.title);
    const photosError =
      locationFields.photos.length === 0
        ? "You need to add at least 1 photo"
        : "";
    const categoriesError =
      locationFields.categories.length === 0
        ? "You need to select at least 1 category"
        : "";
    const locationError =
      country === defaultLocationFields.textLocation.country ||
      country.length === 0 ||
      area === defaultLocationFields.textLocation.area ||
      area.length === 0
        ? "You need to pick a valid location"
        : "";

    if (
      titleError.length !== 0 ||
      photosError.length !== 0 ||
      categoriesError.length !== 0 ||
      locationError.length !== 0
    ) {
      setLocationErrors({
        title: titleError,
        photos: photosError,
        categories: categoriesError,
        textLocation: locationError,
      });
      return false;
    }

    return true;
  }

  async function handleLocationPicking() {
    const localUserCoords: Coordinates = { lat: 0, long: 0 };

    /* 
    A reference to the function that locates the user is kept as a promise,in case the user opens the
    pick location screen before his location is fetched and we need to wait for the promise in this place too
    */

    if (localizationPromise) {
      setWaitingForLocation(true);
      const location = await localizationPromise;
      localUserCoords.lat = location.coords.latitude;
      localUserCoords.long = location.coords.longitude;
      setWaitingForLocation(false);
    }

    // Getting the coordinates here too,because when the promise finishes,
    // the location state doesn't update before the nav code exectues,and we pass the default location

    const coordsToBePassed =
      locationFields.coordinates.lat === 0 &&
      locationFields.coordinates.long === 0
        ? localUserCoords
        : locationFields.coordinates;

    navigation.navigate("PickLocation", { initialLocation: coordsToBePassed });
  }

  async function onAddLocation() {
    if (!validateLocationData()) return;

    setIsLoading(true);
    const addLocationRequest: AddLocationRequest = {
      ...locationFields,
      postedBy: {
        username: mainContext.userData!!.username,
        userId: mainContext.userData!!.id,
      },
    };

    const response = await addLocationPost(addLocationRequest);
    setIsLoading(false);
    if (HttpResponse.isSuccess(response)) {
      navigation.pop();
    } else if (HttpResponse.isError(response)) {
      Alert.alert("An error occurred", response.error);
    }
  }

  useEffect(() => {
    handleUserLocalization();
  }, []);

  useEffect(() => {
    const textLocation = route.params?.textLocation;
    const coordinates = route.params?.coordinates;

    if (textLocation && coordinates) {
      handleInputChange("textLocation", textLocation);
      handleInputChange("coordinates", coordinates);
    }
  }, [route]);

  return (
    <KeyboardAvoidingContainer
      customStyle={styles.container}
      scrollingEnabled={!isUserSliding}
    >
      <View style={styles.innerContainer}>
        <LocationPhotosPicker
          photos={locationFields.photos}
          onUpdatePhotos={(photos) => handleInputChange("photos", photos)}
        />
        <ErrorText errorMessage={locationErrors.photos} />
        <ExactLocationPicker
          textLocation={locationFields.textLocation}
          handleLocationPicking={handleLocationPicking}
        />
        <ErrorText errorMessage={locationErrors.textLocation} />
        <Input
          flat
          label="Location title"
          onChangeText={(title) => handleInputChange("title", title)}
          borderRadius={24}
          borderWidth={1}
          borderColor={Colors.primary}
          marginBottom={24}
          errorText={locationErrors.title}
        />
        <Input
          flat
          label="Location description"
          onChangeText={(description) => {
            handleInputChange("description", description);
          }}
          borderRadius={24}
          borderWidth={1}
          borderColor={Colors.primary}
          marginBottom={24}
          multiline
          height={100}
          blurOnSubmit
        />
        <LocationCategoriesPicker
          categories={locationFields.categories}
          onUpdateCategories={(categories) =>
            handleInputChange("categories", categories)
          }
        />
        <ErrorText errorMessage={locationErrors.categories} />
        <LocationRatingPicker
          rating={locationFields.rating}
          onUpdateRating={(rating) => handleInputChange("rating", rating)}
          onUpdateSlidingStatus={(value) => toggleUserSliding(value)}
        />
        <LoadingOverlay
          label="Working on getting your location..."
          isVisible={waitingForLocation}
        />
        <LoadingOverlay label="Adding location..." isVisible={isLoading} />
        <CustomButton
          color={Colors.secondary}
          label="Add location"
          elevated
          onTap={onAddLocation}
          customStyle={styles.addButton}
        />
      </View>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 1200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  innerContainer: {
    width: "80%",
    height: "95%",
  },
  addButton: {
    marginTop: 36,
  },
});

export default AddLocationScreen;
