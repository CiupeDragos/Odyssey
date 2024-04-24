import { StyleSheet, View, Image, Text } from "react-native";
import { BASE_URL } from "../../util/constants";

type UsernameWithPhotoProps = {
  userId: string;
  username: string;
};

function UsernameWithPhoto({ userId, username }: UsernameWithPhotoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.photoView}>
        <Image
          style={styles.photo}
          source={{ uri: `${BASE_URL}/profile/${userId}.jpg` }}
        />
      </View>
      <Text style={styles.username}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  username: {},
  photoView: {},
  photo: {},
});

export default UsernameWithPhoto;
