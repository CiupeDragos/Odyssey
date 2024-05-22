import { useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { LocationDetailsRouteProp } from "../../../types/navigation";
import LocationCarousel from "../../../components/main/location_details/LocationCarousel";
import LocationMainData from "../../../components/main/location_details/LocationMainData";
import { ScrollView } from "react-native-gesture-handler";
import LocationMapView from "../../../components/main/location_details/LocationMapView";

function LocationDetailsScreen() {
  const route = useRoute<LocationDetailsRouteProp>();
  const location = route.params.location;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <LocationCarousel photos={location.photos} />
      <LocationMainData {...location} />
      <LocationMapView
        lat={location.coordinates.lat}
        long={location.coordinates.long}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 1200,
  },
  scrollView: {
    backgroundColor: "white",
  },
});

export default LocationDetailsScreen;
