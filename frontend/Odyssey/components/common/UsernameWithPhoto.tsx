import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { BASE_URL, Colors } from "../../util/constants";

type UsernameWithPhotoProps = {
  userId: string;
  username: string;
  onClick?: () => void;
};

function UsernameWithPhoto({
  userId,
  username,
  onClick,
}: UsernameWithPhotoProps) {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <Image
        style={styles.photo}
        source={{ uri: `${BASE_URL}/profile/${userId}.jpg` }}
      />
      <Text style={styles.username}>{username}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "400",
    marginLeft: 24,
  },
  photo: {
    width: "20%",
    height: 75,
    borderRadius: 100,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
});

export default UsernameWithPhoto;
