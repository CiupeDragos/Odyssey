import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, UserLocationChangeEvent } from "react-native-maps";
import { getDistanceBetweenPoints } from "../../../http/home-methods";
import { Coordinates } from "../../../types/response-types";
import { HttpResponse } from "../../../http/HttpResponse";
import { getTimeDurationTextFromSeconds } from "../../../util/commonMethods";

type LocationMapViewProps = {
  lat: number;
  long: number;
};

const defaultZoom = {
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

function LocationMapView({ lat, long }: LocationMapViewProps) {
  const [userLocation, setUserLocation] = useState({ lat: 0, long: 0 });
  const [distanceInformation, setDistanceInformation] = useState({
    distance: "",
    duration: 0,
  });

  const timeToDestination = getTimeDurationTextFromSeconds(
    distanceInformation.duration
  );

  const handleUserLocationChange = (event: UserLocationChangeEvent) => {
    const lat = event.nativeEvent.coordinate?.latitude;
    const long = event.nativeEvent.coordinate?.longitude;

    if (lat && long && userLocation.lat === 0 && userLocation.long === 0) {
      setUserLocation({ lat: lat, long: long });
      getDistanceToLocation({ lat: lat, long: long });
    }
  };

  async function getDistanceToLocation(origin: Coordinates) {
    const destination: Coordinates = { lat: lat, long: long };
    const response = await getDistanceBetweenPoints(origin, destination);

    if (HttpResponse.isSuccess(response)) {
      const distance = (
        response.data.rows[0].elements[0].distance.value / 1000
      ).toFixed(0);
      const duration = response.data.rows[0].elements[0].duration.value;

      setDistanceInformation({ distance: distance, duration: duration });
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: defaultZoom.latitudeDelta,
          longitudeDelta: defaultZoom.longitudeDelta,
        }}
        showsUserLocation={true}
        onUserLocationChange={handleUserLocationChange}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: long }}
          title="Exact location"
        />
      </MapView>
      <Text
        style={styles.distanceInfoText}
      >{`You are ${distanceInformation.distance} KM away (${timeToDestination})`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    alignItems: "center",
  },
  map: {
    width: "90%",
    height: 250,
    borderRadius: 24,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
  },
  distanceInfoText: { fontSize: 16, marginTop: 6 },
});

export default LocationMapView;
