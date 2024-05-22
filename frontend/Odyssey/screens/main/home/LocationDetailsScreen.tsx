import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import {
  LocationDetailsRouteProp,
  MainStackNavProp,
} from "../../../types/navigation";

function LocationDetailsScreen() {
  const route = useRoute<LocationDetailsRouteProp>();
  const navigation = useNavigation<MainStackNavProp>();
  const location = route.params.location;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: location.title,
    });
  }, []);

  return (
    <View>
      <Text>Welcome</Text>
    </View>
  );
}

export default LocationDetailsScreen;
