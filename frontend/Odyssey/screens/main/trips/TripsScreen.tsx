import { SafeAreaView, StyleSheet, View } from "react-native";
import { Colors } from "../../../util/constants";
import FloatingActionButton from "../../../components/common/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import {
  MainStackNavProp,
  TripsScreenRouteProp,
} from "../../../types/navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";

function TripsScreen() {
  const navigation = useNavigation<MainStackNavProp>();
  const route = useRoute<TripsScreenRouteProp>();

  const refetchKey = route.params?.refetchKey ?? undefined;

  function handleAddTrip() {
    navigation.navigate("AddTrip");
  }

  useEffect(() => {
    console.log("Fetching trips");
  }, [refetchKey]);

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
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
