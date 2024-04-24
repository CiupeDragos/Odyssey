import { FlatList, StyleSheet, View } from "react-native";
import { Follower } from "../../../http/response-types";
import UsernameWithPhoto from "../../common/UsernameWithPhoto";

type FollowersListProps = {
  followers: Array<Follower>;
};

function FollowersList({ followers }: FollowersListProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={followers}
        renderItem={({ item }) => (
          <UsernameWithPhoto userId={item.userId} username={item.username} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FollowersList;
