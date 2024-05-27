import Carousel from "react-native-reanimated-carousel";
import { BASE_URL } from "../../../util/constants";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { useState } from "react";

type LocationCarouselProps = {
  photos: Array<string>;
};

const width = Dimensions.get("window").width;

function LocationCarousel({ photos }: LocationCarouselProps) {
  const [curIndex, setCurIndex] = useState(1);

  function handleIndexChange(index: number) {
    if (!Number.isInteger(index)) return;

    setCurIndex(index + 1);
  }

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width}
        autoPlay={false}
        data={photos}
        autoPlayInterval={2000}
        scrollAnimationDuration={500}
        onProgressChange={(_, curItemIndex) => {
          handleIndexChange(curItemIndex);
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: `${BASE_URL}/locations/${item}` }}
            width={width}
            height={width * 0.9}
          />
        )}
      />
      <View style={styles.photoCountCenteringView}>
        <View style={styles.photoCountView}>
          <Text
            style={styles.photoCount}
          >{`${curIndex} / ${photos.length}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photoCount: {
    fontSize: 20,
  },
  photoCountView: {
    width: "12%",
    borderRadius: 8,
    marginTop: 4,
    marginLeft: 4,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  photoCountCenteringView: {
    width: width,
    alignItems: "center",
    marginTop: -80,
  },
});

export default LocationCarousel;
