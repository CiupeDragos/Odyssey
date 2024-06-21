import {
  ActivityIndicator,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useState } from "react";

type ImageWithLoaderProps = {
  imageHeight: number;
} & Omit<ImageProps, "height">;

function ImageWithLoader({ imageHeight, ...imageProps }: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={[isLoading && styles.loadingView, { height: imageHeight }]}>
      <Image
        {...imageProps}
        style={[imageProps.style, isLoading && { height: 0 }]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && <ActivityIndicator color="black" />}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingLabel: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ImageWithLoader;
