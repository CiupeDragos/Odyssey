import { useEffect } from "react";
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import * as Splash from "expo-splash-screen";
import FloatingActionButton from "../../../components/common/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../util/constants";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavProp } from "../../../types/navigation";

function HomeScreen() {
  useEffect(() => {
    Splash.hideAsync();
  }, []);

  const navigation = useNavigation<HomeScreenNavProp>();

  function onAddLocationClick() {
    navigation.navigate("AddLocation");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addButtonContainer}>
        <FloatingActionButton
          customStyle={styles.addButton}
          onClick={onAddLocationClick}
        >
          <Ionicons name="add" color="white" size={24} />
        </FloatingActionButton>
      </View>
      <Text>Welcome to the home screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  addButtonContainer: {
    height: "8%",
    alignItems: "flex-end",
    paddingRight: 16,
    paddingTop: 8,
  },
  addButton: {
    backgroundColor: Colors.secondary,
  },
});

export default HomeScreen;
