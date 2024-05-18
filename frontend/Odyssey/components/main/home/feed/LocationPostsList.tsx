import { FlatList, StyleSheet, View } from "react-native";
import { LocationPost } from "../../../../types/response-types";
import LocationPostComponent from "./LocationPostComponent";

type LocationPostsListProps = {
  locationPosts: Array<LocationPost>;
};

function LocationPostsList({ locationPosts }: LocationPostsListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={locationPosts}
        renderItem={({ item }) => <LocationPostComponent locationPost={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  flatList: {
    width: "95%",
  },
  listContainer: {},
});

export default LocationPostsList;
