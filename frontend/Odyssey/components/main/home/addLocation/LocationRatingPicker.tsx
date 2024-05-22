import { StyleSheet, Text, View } from "react-native";
import { Rating } from "../../../../types/response-types";
import { Slider } from "@miblanchard/react-native-slider";
import { useState } from "react";
import { Colors } from "../../../../util/constants";
import RatingSlider from "./RatingSlider";

type LocationRatingPickerProps = {
  rating: Rating;
  onUpdateRating: (rating: Rating) => void;
  onUpdateSlidingStatus: (value: boolean) => void;
};

function LocationRatingPicker({
  rating,
  onUpdateRating,
  onUpdateSlidingStatus,
}: LocationRatingPickerProps) {
  function handleRatingChange(
    field: "safe" | "fun" | "uncrowded" | "affordable",
    value: number
  ) {
    const updatedRating = {
      ...rating,
      [field]: value,
    };

    onUpdateRating(updatedRating);
  }

  return (
    <View>
      <Text style={styles.mainLabel}>Location rating</Text>
      <RatingSlider
        curRating={rating.safe}
        label="Safe"
        onRatingChange={(value) => {
          handleRatingChange("safe", value);
        }}
        onUpdateSlidingStatus={onUpdateSlidingStatus}
      />

      <RatingSlider
        curRating={rating.fun}
        label="Fun"
        onRatingChange={(value) => {
          handleRatingChange("fun", value);
        }}
        onUpdateSlidingStatus={onUpdateSlidingStatus}
      />

      <RatingSlider
        curRating={rating.uncrowded}
        label="Uncrowded"
        onRatingChange={(value) => {
          handleRatingChange("uncrowded", value);
        }}
        onUpdateSlidingStatus={onUpdateSlidingStatus}
      />

      <RatingSlider
        curRating={rating.affordable}
        label="Affordable"
        onRatingChange={(value) => {
          handleRatingChange("affordable", value);
        }}
        onUpdateSlidingStatus={onUpdateSlidingStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainLabel: {
    fontSize: 18,
    marginBottom: 4,
  },
});

export default LocationRatingPicker;
