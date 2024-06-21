import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Colors } from "../../../util/constants";
import FloatingActionButton from "../../../components/common/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import {
  MainStackNavProp,
  TripsScreenRouteProp,
} from "../../../types/navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Trip } from "../../../types/response-types";
import LoadingText from "../../../components/common/LoadingText";
import { getTrips } from "../../../http/trips";
import { HttpResponse } from "../../../http/HttpResponse";
import TripsList from "../../../components/main/trips/TripsList";

function TripsScreen() {
  const navigation = useNavigation<MainStackNavProp>();
  const route = useRoute<TripsScreenRouteProp>();
  const [trips, setTrips] = useState<Array<Trip>>();

  const refetchKey = route.params?.refetchKey ?? undefined;
  const modifiedTripData = route.params?.modifiedTripData ?? undefined;

  async function getAllTrips() {
    const response = await getTrips();

    if (HttpResponse.isSuccess(response)) {
      setTrips(response.data);
    } else if (HttpResponse.isError(response)) {
      Alert.alert("An error occurred", response.error);
    }
  }

  function handleAddTrip() {
    navigation.navigate("AddTrip");
  }

  useEffect(() => {
    getAllTrips();
  }, [refetchKey]);

  useEffect(() => {
    if (!modifiedTripData || !trips) return;
    const tripIndex = trips.findIndex((t) => t.id === modifiedTripData.id);
    const updatedTrips = [...trips];
    const updatedTrip: Trip = {
      ...updatedTrips[tripIndex],
      participants: modifiedTripData.participants,
      chat: modifiedTripData.chat,
    };
    updatedTrips[tripIndex] = updatedTrip;

    setTrips(updatedTrips);
  }, [modifiedTripData]);

  if (!trips) {
    return <LoadingText text="Loading the trips..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addButtonContainer}>
        <FloatingActionButton
          customStyle={styles.addButton}
          onClick={handleAddTrip}
        >
          <Ionicons name="add" color="white" size={24} />
        </FloatingActionButton>
      </View>
      <TripsList trips={trips} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  addButtonContainer: {
    height: "8%",
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 16,
    paddingTop: 4,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: Colors.secondary,
  },
});

export default TripsScreen;
