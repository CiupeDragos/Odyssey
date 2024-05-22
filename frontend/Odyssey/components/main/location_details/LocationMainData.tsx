import { StyleSheet, View, Text } from "react-native";
import {
  Coordinates,
  LocationPoster,
  Rating,
  TextLocation,
} from "../../../types/response-types";
import { LocationTypeEnum } from "../../../util/enums";
import React from "react";
import { Colors } from "../../../util/constants";
import { getDateFromFromTimestamp } from "../../../util/commonMethods";
import UsernameWithPhoto from "../../common/UsernameWithPhoto";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome6,
} from "@expo/vector-icons";
import StarRating from "./StarRating";

type LocationMainDataProps = {
  id: string;
  title: string;
  postedBy: LocationPoster;
  timestamp: number;
  description: string;
  textLocation: TextLocation;
  coordinates: Coordinates;
  categories: Array<LocationTypeEnum>;
  likes: Array<string>;
  rating: Rating;
};

function LocationMainData(locationData: LocationMainDataProps) {
  const categories = locationData.categories.join(", ");

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Details</Text>
      <View style={styles.postedByView}>
        <View style={styles.postAuthorView}>
          <Text style={styles.postedByText}>Posted by: </Text>
          <UsernameWithPhoto
            userId={locationData.postedBy.userId}
            username={locationData.postedBy.username}
            imgWidth="20%"
            imgHeight={35}
            usernameFontSize={18}
            usernameMarginLeft={6}
          />
        </View>
        <View style={styles.postDateView}>
          <Ionicons name="calendar" size={24} color={Colors.primary} />
          <Text style={styles.locationDateText}>
            {getDateFromFromTimestamp(locationData.timestamp)}
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
        >{`${locationData.textLocation.country}, ${locationData.textLocation.area}`}</Text>
      </View>
      <View style={styles.descriptionView}>
        <View style={styles.aboutView}>
          <Ionicons
            name="information-circle"
            size={24}
            color={Colors.primary}
          />
          <Text style={styles.locationDateText}>About</Text>
        </View>
        <Text style={styles.descriptionText}>{locationData.description}</Text>
      </View>
      <View style={styles.ratingsContainer}>
        <Text style={[styles.infoText, { marginBottom: 6 }]}>Ratings</Text>
        <StarRating
          label="Safe"
          rating={locationData.rating.safe}
          icon={<AntDesign name="Safety" size={24} color={Colors.primary} />}
        />
        <StarRating
          label="Fun"
          rating={locationData.rating.fun}
          icon={
            <MaterialCommunityIcons
              name="party-popper"
              size={24}
              color={Colors.primary}
            />
          }
        />
        <StarRating
          label="Uncrowded"
          rating={locationData.rating.uncrowded}
          icon={
            <FontAwesome6
              name="people-group"
              size={24}
              color={Colors.primary}
            />
          }
        />
        <StarRating
          label="Affordable"
          rating={locationData.rating.affordable}
          icon={<FontAwesome name="dollar" size={24} color={Colors.primary} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingLeft: 8,
    paddingRight: 4,
  },
  mainContentView: {
    padding: 8,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "500",
  },
  descriptionView: {
    marginLeft: 2,
    marginTop: 6,
  },
  descriptionText: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 15,
  },
  aboutView: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTitle: {
    padding: 8,
    fontSize: 18,
    fontWeight: "400",
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
  likesView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  countText: {
    fontSize: 18,
    marginLeft: 4,
  },
  ratingsContainer: {
    marginLeft: 4,
    marginTop: 24,
  },
});

export default LocationMainData;
