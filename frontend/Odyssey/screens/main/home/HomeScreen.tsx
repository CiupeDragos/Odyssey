import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Splash from "expo-splash-screen";
import FloatingActionButton from "../../../components/common/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../util/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  HomeScreenNavProp,
  HomeScreenRouteProp,
} from "../../../types/navigation";
import { LocationPost } from "../../../types/response-types";
import { getLocationPosts as getLocations } from "../../../http/home-methods";
import { HttpResponse } from "../../../http/HttpResponse";
import LocationPostsList from "../../../components/main/home/feed/LocationPostsList";
import LoadingText from "../../../components/common/LoadingText";
import { MainContext } from "../../../store/MainContext";

function HomeScreen() {
  const [locationPosts, setLocationPosts] = useState<Array<LocationPost>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<HomeScreenNavProp>();
  const route = useRoute<HomeScreenRouteProp>();
  const mainContext = useContext(MainContext);

  const modifiedLocationPost = route.params?.modifiedLocationPost ?? undefined;

  function onAddLocationClick() {
    navigation.navigate("AddLocation");
  }

  async function getLocationPosts() {
    const response = await getLocations(mainContext.userData!!.id);

    if (HttpResponse.isSuccess(response)) {
      setLocationPosts(response.data);
    } else if (HttpResponse.isError(response)) {
      console.log(response.error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    Splash.hideAsync();
    getLocationPosts();
  }, []);

  useEffect(() => {
    if (modifiedLocationPost) {
      console.log("Received updated location post");
      const locationIndex = locationPosts.findIndex(
        (l) => l.id === modifiedLocationPost.id
      );
      const updatedLocations = [...locationPosts];
      updatedLocations[locationIndex] = modifiedLocationPost;

      console.log(modifiedLocationPost);
      setLocationPosts(updatedLocations);
    }
  }, [modifiedLocationPost]);

  if (isLoading) {
    return <LoadingText text="Loading the location posts..." />;
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

      <LocationPostsList locationPosts={locationPosts} navSource="Home" />
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
    paddingTop: 4,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: Colors.secondary,
  },
});

export default HomeScreen;
