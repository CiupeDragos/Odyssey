import { StyleSheet, Text, View, Pressable } from "react-native";
import { LoungeThread } from "../../../types/response-types";
import UsernameWithPhoto from "../../common/UsernameWithPhoto";
import { getCommentTimestampText } from "../../../util/commonMethods";
import { getThreadTypeIcon } from "../../../util/componentMethods";
import { LoungeScreenNavProp } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";

type ThreadComponentProps = {
  thread: LoungeThread;
};

function ThreadComponent({ thread }: ThreadComponentProps) {
  const navigation = useNavigation<LoungeScreenNavProp>();
  const timestampText = getCommentTimestampText(thread.timestamp);
  const icon = getThreadTypeIcon(thread.threadType);

  function goToDetailsPage() {
    navigation.navigate("ThreadDetails", {
      thread: thread,
    });
  }

  return (
    <Pressable style={styles.container} onPress={goToDetailsPage}>
      <View style={styles.threadTypeContainer}>
        <View style={styles.threadTypeView}>
          <Text style={styles.typeLabel}>{thread.threadType}</Text>
          <View style={styles.iconView}>{icon}</View>
        </View>
      </View>
      <Text style={styles.titleLabel}>{thread.title}</Text>
      <Text style={styles.contentLabel} numberOfLines={4}>
        {thread.content}
      </Text>
      <View style={styles.bottomRow}>
        <Text style={styles.answersLabel}>{thread.answers.length} answers</Text>
        <View style={styles.authorRow}>
          <UsernameWithPhoto
            userId={thread.authorId}
            username={thread.authorUsername}
            imgHeight={25}
            imgWidth={25}
            usernameFontSize={14}
            usernameMarginLeft={4}
          />
          <Text style={styles.timestampLabel}>{timestampText}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingTop: 12,

    borderRadius: 16,
  },
  threadTypeContainer: {
    flexDirection: "row",
  },
  threadTypeView: {
    flexDirection: "row",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 6,
    backgroundColor: "lightblue",
    paddingHorizontal: 4,
    marginLeft: -4,
    paddingVertical: 4,
  },
  titleLabel: {
    marginBottom: 4,
    fontSize: 18,
    fontWeight: "500",
  },
  contentLabel: {
    fontSize: 14,
  },
  bottomRow: {
    marginTop: 16,
  },
  answersLabel: {
    fontSize: 16,
    fontWeight: "400",
  },
  authorRow: {
    flexDirection: "row",
    marginLeft: -5,
    alignItems: "center",
  },
  timestampLabel: {
    color: "gray",
    fontSize: 13,
    fontWeight: "600",
    flex: 2,
  },
  typeLabel: {
    fontSize: 18,
  },
  iconView: {
    marginLeft: 4,
  },
});

export default ThreadComponent;
