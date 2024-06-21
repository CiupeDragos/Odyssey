import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { LocationPost } from "../../../../types/response-types";
import { BASE_URL, Colors } from "../../../../util/constants";
import UsernameWithPhoto from "../../../common/UsernameWithPhoto";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { getDateFromFromTimestamp } from "../../../../util/commonMethods";
import { useNavigation } from "@react-navigation/native";
import { BottomTabsNav, MainStackNavProp } from "../../../../types/navigation";
import { useContext } from "react";
import { MainContext } from "../../../../store/MainContext";
import ImageWithLoader from "../../../common/ImageWithLoader";

type LocationPostComponentProps = {
  locationPost: LocationPost;
};

function LocationPostComponent({ locationPost }: LocationPostComponentProps) {
  const mainContext = useContext(MainContext);
  const categories = locationPost.categories.join(", ");
  const averageRating = (
    (locationPost.rating.affordable +
      locationPost.rating.fun +
      locationPost.rating.safe +
      locationPost.rating.uncrowded) /
    4
  ).toFixed(1);
  const navigation = useNavigation<MainStackNavProp>();
  const didUserLike = locationPost.likes.includes(mainContext.userData!!.id);

  function goToDetails() {
    navigation.navigate("LocationDetails", { location: locationPost });
  }

  return (
    <Pressable style={styles.container} onPress={goToDetails}>
      <Text style={styles.locationTitle}>{locationPost.title}</Text>
      <ImageWithLoader
        imageHeight={400}
        style={styles.locationImage}
        source={{ uri: `${BASE_URL}/locations/${locationPost.photos[1]}` }}
      />
      <View style={styles.mainContentView}>
        <View style={styles.postedByView}>
          <View style={styles.postAuthorView}>
            <Text style={styles.postedByText}>Posted by: </Text>
            <UsernameWithPhoto
              userId={locationPost.postedBy.userId}
              username={locationPost.postedBy.username}
              imgWidth="20%"
              imgHeight={33}
              usernameFontSize={18}
              usernameMarginLeft={6}
            />
          </View>
          <View style={styles.postDateView}>
            <Ionicons name="calendar" size={24} color={Colors.primary} />
            <Text style={styles.locationDateText}>
              {getDateFromFromTimestamp(locationPost.timestamp)}
            </Text>
          </View>
        </View>
        <View style={styles.categoriesView}>
          <AntDesign name="tags" size={28} color={Colors.primary} />
          <Text style={styles.categoriesText}>{categories}</Text>
        </View>
        <View style={styles.textLocationView}>
          <Ionicons name="location" size={28} color={Colors.primary} />
          <Text
            style={styles.textLocationLabel}
          >{`${locationPost.textLocation.country}, ${locationPost.textLocation.area}`}</Text>
        </View>
        <View style={styles.actionsView}>
          <View style={styles.likesView}>
            <AntDesign
              name="like1"
              size={24}
              color={didUserLike ? Colors.primary : "gray"}
            />
            <Text style={styles.countText}>{locationPost.likes.length}</Text>
          </View>
          <View style={styles.commentsView}>
            <FontAwesome name="comments" size={24} color={Colors.primary} />
            <Text style={styles.countText}>{locationPost.comments.length}</Text>
          </View>
          <View style={styles.averageRatingView}>
            <MaterialIcons name="grade" size={28} color={Colors.primary} />
            <Text style={styles.averageRatingText}>{averageRating} / 5</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
  mainContentView: {
    padding: 8,
  },
  locationTitle: {
    padding: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  locationImage: {
    height: 400,
    resizeMode: "cover",
  },
  postedByView: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  postAuthorView: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  postDateView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  postedByText: {
    fontSize: 15,
  },
  locationDateText: {
    fontSize: 15,
    marginLeft: 4,
  },
  categoriesView: {
    marginLeft: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  categoriesText: {
    fontSize: 15,
    marginLeft: 4,
  },
  textLocationView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  textLocationLabel: {
    fontSize: 15,
    marginLeft: 4,
  },
  averageRatingView: {
    flexDirection: "row",
    alignItems: "center",
  },
  averageRatingText: {
    fontSize: 15,
    marginLeft: 4,
  },
  actionsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginLeft: 4,
  },
  likesView: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsView: {
    flexDirection: "row",
    alignItems: "center",
  },
  countText: {
    fontSize: 18,
    marginLeft: 4,
  },
});

export default LocationPostComponent;
