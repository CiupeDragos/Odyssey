import { Slider } from "@miblanchard/react-native-slider";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../../../util/constants";

type RatingSliderProps = {
  curRating: number;
  label: string;
  onRatingChange: (value: number) => void;
  onUpdateSlidingStatus: (value: boolean) => void;
};

function RatingSlider({
  curRating,
  label,
  onRatingChange,
  onUpdateSlidingStatus,
}: RatingSliderProps) {
  return (
    <View style={styles.ratingCategoryView}>
      <Text style={styles.ratingCategoryLabel}>{label}</Text>
      <Text style={styles.ratingNumberLabel}>{curRating}</Text>
      <Slider
        minimumValue={0}
        maximumValue={5}
        step={0.5}
        value={curRating}
        containerStyle={styles.slider}
        onValueChange={(value) => {
          onRatingChange(parseFloat(value[0].toFixed(1)));
        }}
        onSlidingStart={() => {
          onUpdateSlidingStatus(true);
        }}
        onSlidingComplete={() => {
          onUpdateSlidingStatus(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ratingCategoryView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingCategoryLabel: {
    fontSize: 16,
    marginRight: 6,
    width: 90,
  },
  ratingNumberLabel: {
    fontSize: 20,
  },
  slider: {
    width: 180,
  },
});

export default RatingSlider;
