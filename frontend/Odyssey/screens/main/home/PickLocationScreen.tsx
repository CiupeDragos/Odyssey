import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useLayoutEffect, useState } from "react";
import { Coordinates, TextLocation } from "../../../types/response-types";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MAPS_API_KEY } from "../../../util/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  PickLocationNavProp,
  PickLocationRouteProp,
} from "../../../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { getAdressFromCoordinates } from "../../../http/home-methods";
import { HttpResponse } from "../../../http/HttpResponse";
import { getTextLocationFromAddressArray } from "../../../util/commonMethods";
import LoadingOverlay from "../../../components/common/LoadingOverlay";

export type AddressComponent = {
  long_name: string;
  short_name: string;
  types: Array<string>;
};

const defaultLocation: Coordinates = {
  lat: 0,
  long: 0,
};

const defaultZoom = {
  latitudeDelta: 0.0005,
  longitudeDelta: 0.001,
};

function PickLocationScreen() {
  const [pickedLocation, setPickedLocation] = useState(defaultLocation);
  const [isSaving, setIsSaving] = useState(false);
  const route = useRoute<PickLocationRouteProp>();
  const navigation = useNavigation<PickLocationNavProp>();
  const initialLocation = route.params.initialLocation;

  console.log("Map screen rendered");

  function handleMarkerPlacement(coords: {
    latitude: number;
    longitude: number;
  }) {
    setPickedLocation({ lat: coords.latitude, long: coords.longitude });
  }

  async function handleLocationSave() {
    let textLocation: TextLocation = { country: "", area: "" };

    setIsSaving(true);
    const adressResponse = await getAdressFromCoordinates(
      pickedLocation.lat,
      pickedLocation.long
    );

    if (HttpResponse.isSuccess(adressResponse)) {
      textLocation = getTextLocationFromAddressArray(
        adressResponse.data.results[0].address_components
      );
    } else if (HttpResponse.isError(adressResponse)) {
      Alert.alert("Error occurred", adressResponse.error);
      return;
    }
    setIsSaving(false);

    navigation.navigate("AddLocation", {
      textLocation: textLocation,
      coordinates: { lat: pickedLocation.lat, long: pickedLocation.long },
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleLocationSave}>
          <Ionicons name="save" color="white" size={24} />
        </Pressable>
      ),
    });
  }, [handleLocationSave]);

  useEffect(() => {
    setPickedLocation(initialLocation);
  }, [setPickedLocation, initialLocation]);

  console.log("Picked location is ", pickedLocation);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitude: pickedLocation.lat,
          longitude: pickedLocation.long,
          latitudeDelta: defaultZoom.latitudeDelta,
          longitudeDelta: defaultZoom.longitudeDelta,
        }}
        onPress={({ nativeEvent }) =>
          handleMarkerPlacement(nativeEvent.coordinate)
        }
      >
        <Marker
          key={`${pickedLocation.lat}-${pickedLocation.long}`}
          coordinate={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.long,
          }}
          title={"Picked location"}
          description={
            "This will be the exact location users will see when looking at this post"
          }
        />
      </MapView>
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        placeholder="Search for a location"
        query={{ key: MAPS_API_KEY, language: "en" }}
        onPress={(data, details) => {
          handleMarkerPlacement({
            latitude: details?.geometry.location.lat ?? 0,
            longitude: details?.geometry.location.lng ?? 0,
          });
        }}
        fetchDetails={true}
        styles={{
          container: styles.placesAutocomplete,
        }}
      />
      <LoadingOverlay label="Saving exact location..." isVisible={isSaving} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  noLocationView: {
    flex: 1,
    justifyContent: "center",
  },
  noLocationText: {
    fontSize: 24,
    textAlign: "center",
  },
  placesAutocomplete: {
    marginHorizontal: 6,
    marginTop: 6,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
});

export default PickLocationScreen;
