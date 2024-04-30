import * as IPicker from "expo-image-picker";
import { Alert, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../../common/CustomButton";
import { Colors } from "../../../../util/constants";
import { getBase64FromUri } from "../../../../util/commonMethods";
import Carousel from "react-native-snap-carousel";
import CarouselImage from "./CarouselImage";
import { useState } from "react";

type LocationPhotosPickerProps = {
  photos: Array<string>;
  onUpdatePhotos: (photos: Array<string>) => void;
};

function LocationPhotosPicker({
  photos,
  onUpdatePhotos,
}: LocationPhotosPickerProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handlePhotosPicking() {
    const result = await IPicker.launchImageLibraryAsync({
      mediaTypes: IPicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;

    setIsLoading(true);
    const images = result.assets;
    const base64Images = await Promise.all(
      images.map(async (image) => {
        const curImageAsBase64 = await getBase64FromUri(image.uri);

        if (!curImageAsBase64) {
          return "";
        }

        return curImageAsBase64;
      })
    );
    if (base64Images.includes("")) {
      Alert.alert("Failed to load all photos");
      return;
    }

    const newPhotosArray = [...photos, ...base64Images];
    setIsLoading(false);
    onUpdatePhotos(newPhotosArray);
  }

  function deleteImageFromCarousel(photoIndex: number) {
    const newPhotosArray = [...photos];
    newPhotosArray.splice(photoIndex, 1);

    onUpdatePhotos(newPhotosArray);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Location photos</Text>
      <View style={styles.carouselView}>
        {photos.length === 0 && !isLoading && (
          <Text style={styles.noPhotosText}>No photos selected</Text>
        )}
        {isLoading && (
          <Text style={styles.noPhotosText}>Loading pictures...</Text>
        )}
        {photos.length !== 0 && !isLoading && (
          <Carousel
            data={photos}
            renderItem={({ item, index }) => (
              <CarouselImage
                base64Image={item}
                onDelete={() => {
                  deleteImageFromCarousel(index);
                }}
              />
            )}
            itemWidth={250}
            sliderWidth={300}
          />
        )}
      </View>
      <CustomButton
        customStyle={styles.button}
        color={Colors.secondary}
        label="Pick photos"
        onTap={handlePhotosPicking}
        outlined
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "35%",
    marginBottom: 12,
  },
  label: { fontSize: 18 },
  carouselView: {
    flex: 1,
    marginTop: 4,
    justifyContent: "center",
  },
  button: {
    marginTop: 4,
  },
  noPhotosText: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default LocationPhotosPicker;
