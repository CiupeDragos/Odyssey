import React, { useEffect } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import FloatingActionButton from "../../../components/common/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../util/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  LoungeScreenNavProp,
  LoungeScreenRouteProp,
} from "../../../types/navigation";

function TravelerLoungeScreen() {
  const navigation = useNavigation<LoungeScreenNavProp>();
  const route = useRoute<LoungeScreenRouteProp>();

  const refetchKey = route.params?.refetchKey ?? undefined;

  function handleAddThread() {
    navigation.navigate("AddThread");
  }

  useEffect(() => {
    console.log("Fetching data");
  }, [refetchKey]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addButtonContainer}>
        <FloatingActionButton
          customStyle={styles.addButton}
          onClick={handleAddThread}
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
  },
  addButtonContainer: {
    height: "8%",
    alignItems: "flex-end",
    paddingRight: 16,
    paddingTop: 4,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: Colors.secondary,
  },
});

export default TravelerLoungeScreen;
