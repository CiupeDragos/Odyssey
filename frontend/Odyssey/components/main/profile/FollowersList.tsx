import { FlatList, StyleSheet, View } from "react-native";
import { Follower } from "../../../types/response-types";
import UsernameWithPhoto from "../../common/UsernameWithPhoto";
import { FollowersNavProp } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";

type FollowersListProps = {
  followers: Array<Follower>;
};

function FollowersList({ followers }: FollowersListProps) {
  const navigation = useNavigation<FollowersNavProp>();

  function handleUserClick(userId: string) {
    navigation.push("MainTabs", {
      screen: "Profile",
      params: { userId: userId },
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.listView}>
        <FlatList
          data={followers}
          renderItem={({ item }) => (
            <UsernameWithPhoto
              userId={item.userId}
              username={item.username}
              onClick={() => handleUserClick(item.userId)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
  },
  listView: {
    width: "95%",
    height: "80%",
    marginTop: 24,
  },
});

export default FollowersList;
