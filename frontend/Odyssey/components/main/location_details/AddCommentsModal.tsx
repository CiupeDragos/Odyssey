import { Modal, StyleSheet, View, Text } from "react-native";
import Input from "../../common/Input";
import { Colors } from "../../../util/constants";
import CustomButton from "../../common/CustomButton";
import { useState } from "react";

type AddCommentsModalProps = {
  isVisible: boolean;
  mode: "Location" | "Thread";
  closeModal: () => void;
  onAddComment: (content: string) => void;
};

function AddCommentsModal({
  isVisible,
  mode,
  closeModal,
  onAddComment,
}: AddCommentsModalProps) {
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState<string>();

  function handleContentChange(value: string) {
    setCommentContent(value);
  }

  function handleAddComment() {
    if (commentContent.length === 0) {
      setError("Field can't be empty");
      return;
    }
    onAddComment(commentContent);
    setError(undefined);
    setCommentContent("");
  }

  function onCloseModal() {
    setError(undefined);
    closeModal();
  }

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={{ height: "30%" }}></View>
        <View style={styles.addCommentForm}>
          <Input
            value={commentContent}
            onChangeText={handleContentChange}
            placeholder={
              mode === "Location" ? "Add a new comment" : "Add a new answer"
            }
            customStyle={styles.input}
            flat
            borderColor={Colors.primary}
            borderWidth={1.5}
            borderRadius={24}
            placeholderTextColor="gray"
            height={70}
            multiline={true}
            blurOnSubmit
            marginBottom={0}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.actionsView}>
            <CustomButton
              color={Colors.secondary}
              label="Cancel"
              outlined
              onTap={onCloseModal}
              customStyle={styles.button}
            />

            <CustomButton
              color={Colors.secondary}
              label="Add"
              onTap={handleAddComment}
              customStyle={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  addCommentForm: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: "center",
  },
  input: {
    width: "90%",
  },
  actionsView: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    width: "45%",
  },
  errorText: {
    paddingVertical: 8,
    fontSize: 16,
    color: Colors.errorText,
  },
});

export default AddCommentsModal;
