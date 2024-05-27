import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../../util/constants";
import { Rating } from "../../../types/response-types";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";

type LocationActionsProps = {
  likeCount: number;
  didUserLike: boolean;
  commentsCount: number;
  rating: Rating;
  onLike?: () => void;
};

function LocationActions({
  likeCount,
  didUserLike,
  commentsCount,
  rating,
  onLike,
}: LocationActionsProps) {
  const averageRating = (
    (rating.affordable + rating.fun + rating.safe + rating.uncrowded) /
    4
  ).toFixed(1);

  return (
    <View style={styles.actionsView}>
      <View style={styles.likesView}>
        <Pressable onPress={onLike}>
          <AntDesign
            name="like1"
            size={32}
            color={didUserLike ? Colors.primary : "gray"}
          />
        </Pressable>
        <Text style={styles.countText}>{likeCount}</Text>
      </View>
      <View style={styles.commentsView}>
        <FontAwesome name="comments" size={32} color={Colors.primary} />
        <Text style={styles.countText}>{commentsCount}</Text>
      </View>
      <View style={styles.averageRatingView}>
        <MaterialIcons name="grade" size={36} color={Colors.primary} />
        <Text style={styles.averageRatingText}>{averageRating} / 5</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 18,
    marginLeft: 4,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  likesView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  commentsView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  countText: {
    fontSize: 18,
    marginLeft: 4,
  },
});

export default LocationActions;
