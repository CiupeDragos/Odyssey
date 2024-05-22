import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getRatingStars } from "../../../util/commonMethods";
import { Colors } from "../../../util/constants";
import { ReactNode } from "react";

type StarRatingProps = {
  label: string;
  rating: number;
  icon: ReactNode;
};

function StarRating({ label, rating, icon }: StarRatingProps) {
  const [fullStarsCount, emptyStarsCount, hasHalfStar] = getRatingStars(
    rating.toString()
  );
  const fullStars = [...Array(fullStarsCount).keys()];
  const emptyStars = [...Array(emptyStarsCount).keys()];

  return (
    <View style={styles.container}>
      <View style={styles.iconView}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.starsContainer}>
        {fullStars.map((nr) => (
          <Ionicons key={nr} name="star" size={28} color={Colors.ratingColor} />
        ))}
        {hasHalfStar && (
          <Ionicons
            name="star-half-outline"
            size={28}
            color={Colors.ratingColor}
          />
        )}
        {emptyStars.map((nr) => (
          <Ionicons
            key={nr}
            name="star-outline"
            size={28}
            color={Colors.ratingColor}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  label: {
    fontSize: 15,
    width: 90,
    marginLeft: 4,
  },
  starsContainer: {
    flexDirection: "row",
  },
  iconView: {
    width: 32,
  },
});

export default StarRating;
