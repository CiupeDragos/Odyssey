import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, ScrollView, LogBox } from "react-native";
import {
  MainStackNavProp,
  ThreadDetailsRouteProp,
} from "../../../types/navigation";
import { getCommentTimestampText } from "../../../util/commonMethods";
import { getThreadTypeIcon } from "../../../util/componentMethods";
import UsernameWithPhoto from "../../../components/common/UsernameWithPhoto";
import CommentsSection from "../../../components/main/location_details/CommentsSection";
import { Comment } from "../../../types/response-types";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../store/MainContext";
import HorizontalRule from "../../../components/common/HorizontalRule";

function ThreadDetailsScreen() {
  const mainContext = useContext(MainContext);
  const navigation = useNavigation<MainStackNavProp>();
  const route = useRoute<ThreadDetailsRouteProp>();
  const [curThread, setCurThread] = useState(route.params.thread);
  const timestampText = getCommentTimestampText(curThread.timestamp);
  const icon = getThreadTypeIcon(curThread.threadType);
  const curUser = mainContext.userData!!.username;

  function addComment(comment: Comment) {
    setCurThread((curValue) => ({
      ...curValue,
      answers: [comment, ...curValue.answers],
    }));
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    navigation.addListener("blur", () => {
      navigation.navigate("MainTabs", {
        screen: "TravelerLounge",
        params: { modifiedThread: curThread },
      });
    });
  }, [curThread]);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.threadTypeContainer}>
          <View style={styles.threadTypeView}>
            <Text style={styles.typeLabel}>{curThread.threadType}</Text>
            <View style={styles.iconView}>{icon}</View>
          </View>
        </View>
        <Text style={styles.titleLabel}>{curThread.title}</Text>
        <Text style={styles.contentLabel}>{curThread.content}</Text>
        <View style={styles.authorRow}>
          <Text style={styles.postedByLabel}>Posted by </Text>
          <UsernameWithPhoto
            userId={curThread.authorId}
            username={
              curThread.authorUsername === curUser
                ? "You"
                : curThread.authorUsername
            }
            imgHeight={35}
            imgWidth={35}
            usernameFontSize={18}
            usernameMarginLeft={6}
          />
          <Text style={styles.timestampLabel}>{timestampText}</Text>
        </View>
      </View>
      <View style={styles.divider}>
        <HorizontalRule />
      </View>
      <CommentsSection
        mode="Thread"
        comments={curThread.answers}
        commentOwnerId={curThread.id}
        onAddComment={addComment}
        marginTop={20}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  scrollViewContainer: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  container: {
    paddingTop: 12,
    paddingHorizontal: 24,
    backgroundColor: "white",
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
    fontSize: 20,
    fontWeight: "500",
  },
  divider: {
    marginHorizontal: 4,
  },
  contentLabel: {
    fontSize: 16,
  },
  postedByLabel: {
    fontSize: 18,
    fontWeight: "400",
  },
  answersLabel: {
    fontSize: 16,
    fontWeight: "400",
  },
  authorRow: {
    marginTop: 8,
    flexDirection: "row",
    marginLeft: 0,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  timestampLabel: {
    color: "gray",
    fontSize: 16,
    fontWeight: "600",
  },
  typeLabel: {
    fontSize: 18,
  },
  iconView: {
    marginLeft: 4,
  },
});

export default ThreadDetailsScreen;
