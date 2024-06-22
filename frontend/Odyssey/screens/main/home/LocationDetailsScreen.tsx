import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, LogBox, StyleSheet, View } from "react-native";
import {
  LocationDetailsRouteProp,
  MainStackNavProp,
} from "../../../types/navigation";
import LocationCarousel from "../../../components/main/location_details/LocationCarousel";
import LocationMainData from "../../../components/main/location_details/LocationMainData";
import { ScrollView } from "react-native-gesture-handler";
import LocationMapView from "../../../components/main/location_details/LocationMapView";
import LocationActions from "../../../components/main/location_details/LocationActions";
import { MainContext } from "../../../store/MainContext";
import { useState, useContext, useEffect } from "react";
import { likeLocation } from "../../../http/home-methods";
import { HttpResponse } from "../../../http/HttpResponse";
import CommentsSection from "../../../components/main/location_details/CommentsSection";
import { Comment } from "../../../types/response-types";

export type NAV_SOURCE = "Home" | "Profile";

function LocationDetailsScreen() {
  const mainContext = useContext(MainContext);
  const route = useRoute<LocationDetailsRouteProp>();
  const navigation = useNavigation<MainStackNavProp>();
  const [location, setLocation] = useState(route.params.location);
  const curUser = mainContext.userData!!.id;
  const navSource = route.params.navSource;

  function updateLikes() {
    if (location.likes.includes(curUser)) {
      setLocation((curLocation) => ({
        ...curLocation,
        likes: curLocation.likes.filter((id) => id !== curUser),
      }));
    } else {
      setLocation((curLocation) => ({
        ...curLocation,
        likes: [...curLocation.likes, curUser],
      }));
    }
  }

  async function handleLikePost() {
    const response = await likeLocation(curUser, location.id);

    if (HttpResponse.isSuccess(response)) {
      updateLikes();
    } else if (HttpResponse.isError(response)) {
      Alert.alert(
        "An error occurred",
        "There was an error when liking the post"
      );
      console.log(response.error);
    }
  }

  async function handleAddComment(comment: Comment) {
    setLocation((curLocation) => ({
      ...curLocation,
      comments: [comment, ...curLocation.comments],
    }));
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    if (navSource === "Home") {
      navigation.addListener("blur", () => {
        console.log("Intercepted back navigation");
        navigation.navigate("MainTabs", {
          screen: "Home",
          params: { modifiedLocationPost: location },
        });
      });
    } else {
      navigation.addListener("blur", () => {
        console.log("Intercepted back navigation");
        navigation.navigate("MainTabs", {
          screen: "Profile",
          params: { modifiedLocationPost: location },
        });
      });
    }
  }, [location]);

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
      <LocationActions
        likeCount={location.likes.length}
        didUserLike={location.likes.includes(curUser)}
        commentsCount={location.comments.length}
        rating={location.rating}
        onLike={handleLikePost}
      />
      <CommentsSection
        mode="Location"
        comments={location.comments}
        onAddComment={handleAddComment}
        commentOwnerId={location.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  scrollView: {
    backgroundColor: "white",
  },
});

export default LocationDetailsScreen;
