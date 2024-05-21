import { FlatList, StyleSheet, View } from "react-native";
import { Follower } from "../../../types/response-types";
import UsernameWithPhoto from "../../common/UsernameWithPhoto";
import { BottomTabsNav, FollowersNavProp } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";

type SearchResultsProps = {
  users: Array<Follower>;
};

function SearchUsersResult({ users }: SearchResultsProps) {
  const navigation = useNavigation<BottomTabsNav>();

  function handleUserClick(userId: string) {
    navigation.navigate("Profile", { userId: userId });
  }

  return (
    <View style={styles.container}>
      <View style={styles.listView}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <UsernameWithPhoto
              userId={item.userId}
              username={item.username}
              onClick={() => handleUserClick(item.userId)}
              imgWidth="18%"
              imgHeight={60}
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
  },
});

export default SearchUsersResult;
