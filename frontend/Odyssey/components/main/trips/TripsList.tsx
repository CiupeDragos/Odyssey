import { FlatList, StyleSheet, Text } from "react-native";
import { Trip } from "../../../types/response-types";
import TripComponent from "./TripComponent";

type TripsListProps = {
  trips: Array<Trip>;
};

function TripsList({ trips }: TripsListProps) {
  return (
    <FlatList
      style={styles.list}
      data={trips}
      renderItem={({ item }) => <TripComponent trip={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: "95%",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default TripsList;
