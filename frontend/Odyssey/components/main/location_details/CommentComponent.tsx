import { StyleSheet, View, Text } from "react-native";
import { Comment } from "../../../types/response-types";
import UsernameWithPhoto from "../../common/UsernameWithPhoto";
import { getCommentTimestampText } from "../../../util/commonMethods";
import { useContext } from "react";
import { MainContext } from "../../../store/MainContext";

type CommentComponentProps = {
  comment: Comment;
};

function CommentComponent({ comment }: CommentComponentProps) {
  const mainContext = useContext(MainContext);
  const timestampText = getCommentTimestampText(comment.timestamp);
  const curUsername = mainContext.userData!!.username;

  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        <UsernameWithPhoto
          userId={comment.authorId}
          username={
            comment.authorUsername === curUsername
              ? "You"
              : comment.authorUsername
          }
          imgWidth="11%"
          imgHeight={35}
          usernameFontSize={20}
          usernameMarginLeft={8}
        />
        <Text style={styles.commentContent}>{comment.content}</Text>
        <Text style={styles.timestampLabel}>{timestampText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 24,
  },
  commentContainer: {
    width: "80%",
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.1,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 4 },
    borderRadius: 24,
    padding: 8,
  },
  commentContent: {
    paddingTop: 8,
    paddingLeft: 6,
    fontSize: 16,
  },
  timestampLabel: {
    paddingTop: 12,
    paddingLeft: 6,
    color: "gray",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CommentComponent;
