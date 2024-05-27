import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Comment } from "../../../types/response-types";
import {
  AddCommentRequest,
  AddThreadReplyRequest,
} from "../../../types/request-types";
import HorizontalRule from "../../common/HorizontalRule";
import FloatingActionButton from "../../common/FloatingActionButton";
import { Colors } from "../../../util/constants";
import { Ionicons } from "@expo/vector-icons";
import AddCommentsModal from "./AddCommentsModal";
import { useContext, useState } from "react";
import { MainContext } from "../../../store/MainContext";
import { addComment } from "../../../http/lounge";
import { HttpResponse } from "../../../http/HttpResponse";
import LoadingOverlay from "../../common/LoadingOverlay";
import CommentComponent from "./CommentComponent";

type CommentsSectionProps = {
  comments: Array<Comment>;
  onAddComment: (comment: Comment) => void;
  mode: "Location" | "Thread";
  commentOwnerId: string;
};

function CommentsSection({
  comments,
  onAddComment,
  mode,
  commentOwnerId,
}: CommentsSectionProps) {
  const mainContext = useContext(MainContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  comments.sort((a, b) => b.timestamp - a.timestamp);

  async function handleAddComment(content: string) {
    setIsLoading(true);
    if (mode === "Location") {
      const addCommentRequest: AddCommentRequest = {
        authorId: mainContext.userData!!.id,
        authorUsername: mainContext.userData!!.username,
        locationId: commentOwnerId,
        timestamp: new Date().getTime(),
        content: content,
      };

      const response = await addComment(addCommentRequest);

      if (HttpResponse.isSuccess(response)) {
        toggleModal(false);
        onAddComment({ ...addCommentRequest });
      } else {
        Alert.alert(
          "An error occurred",
          "There was an error when adding the comment"
        );
      }
    } else {
      // To do: implement for situation when we are on a thread instead of location
    }
    setIsLoading(false);
  }

  function toggleModal(value: boolean) {
    setIsModalVisible(value);
  }

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.labelView}>
          <Text style={styles.commentsLabel}>
            {mode === "Location" ? "Comments" : "Answers"}
          </Text>
          {mode === "Thread" && (
            <Text style={styles.countLabel}>{comments.length}</Text>
          )}
        </View>
        <FloatingActionButton
          customStyle={styles.addButton}
          onClick={() => toggleModal(true)}
        >
          <Ionicons name="add" color="white" size={24} />
        </FloatingActionButton>
      </View>
      <HorizontalRule />
      <FlatList
        style={styles.list}
        data={comments}
        renderItem={({ item }) => <CommentComponent comment={item} />}
      />
      <AddCommentsModal
        mode={mode}
        isVisible={isModalVisible}
        closeModal={() => toggleModal(false)}
        onAddComment={handleAddComment}
      />
      <LoadingOverlay
        isVisible={isLoading}
        label={mode === "Location" ? "Adding comment..." : "Adding answer..."}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 36,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelView: {
    flexDirection: "row",
  },
  commentsLabel: {
    fontSize: 28,
  },
  countLabel: {
    fontSize: 26,
    marginLeft: 8,
    marginTop: 3,
  },
  list: {
    paddingBottom: 100,
  },
  addButton: {
    backgroundColor: Colors.secondary,
  },
});

export default CommentsSection;
