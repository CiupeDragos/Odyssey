import { FlatList, StyleSheet, View } from "react-native";
import { LocationPost } from "../../../../types/response-types";
import LocationPostComponent from "./LocationPostComponent";
import { NAV_SOURCE } from "../../../../screens/main/home/LocationDetailsScreen";

type LocationPostsListProps = {
  locationPosts: Array<LocationPost>;
  navSource: NAV_SOURCE;
};

function LocationPostsList({
  locationPosts,
  navSource,
}: LocationPostsListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={locationPosts}
        renderItem={({ item }) => (
          <LocationPostComponent locationPost={item} navSource={navSource} />
        )}
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
