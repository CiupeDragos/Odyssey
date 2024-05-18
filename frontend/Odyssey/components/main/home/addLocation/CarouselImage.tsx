import { StyleSheet, View, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

type CarouselImageProps = {
  base64Image: string;
  onDelete: () => void;
};

function CarouselImage({ base64Image, onDelete }: CarouselImageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Pressable
          style={({ pressed }) => [styles.iconView, pressed && styles.pressed]}
          onPress={onDelete}
        >
          <Feather name="x" color="black" size={24} />
        </Pressable>
        <Image
          style={styles.image}
          source={{ uri: `data:image/png;base64,${base64Image}` }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    paddingBottom: 8,
  },
  imageView: {
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.3,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  iconView: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "white",
    marginLeft: 4,
    marginTop: 4,
    borderRadius: 24,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: {
    opacity: 0.7,
  },
});

export default CarouselImage;
