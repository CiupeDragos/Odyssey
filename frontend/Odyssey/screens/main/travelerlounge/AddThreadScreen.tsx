import { Alert, StyleSheet, Text, View } from "react-native";
import { AddLoungeThreadRequest } from "../../../types/request-types";
import { ThreadType } from "../../../util/enums";
import { useContext, useState } from "react";
import Input from "../../../components/common/Input";
import { Colors } from "../../../util/constants";
import ThreadTypeComponent from "../../../components/main/lounge/ThreadTypeComponent";
import { getThreadTypeIcon } from "../../../util/componentMethods";
import CustomButton from "../../../components/common/CustomButton";
import { MainContext } from "../../../store/MainContext";
import { addThread } from "../../../http/lounge";
import { HttpResponse } from "../../../http/HttpResponse";
import LoadingOverlay from "../../../components/common/LoadingOverlay";
import {
  CommonActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { AddThreadNavProp } from "../../../types/navigation";

const defaultState = {
  title: "",
  content: "",
  threadType: ThreadType.DISCUSSION,
};

const defaultErrorState = {
  title: "",
  content: "",
};

function AddThreadScreen() {
  const mainContext = useContext(MainContext);
  const [threadData, setThreadData] = useState(defaultState);
  const [fieldError, setFieldErrors] = useState(defaultErrorState);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AddThreadNavProp>();

  function handleFieldUpdate(field: string, value: string | ThreadType) {
    setThreadData((curData) => ({
      ...curData,
      [field]: value,
    }));
  }

  function validateData() {
    const titleError =
      threadData.title.length === 0 ? "Title can't be empty" : "";
    const contentError =
      threadData.content.length === 0 ? "Content can't be empty" : "";

    if (titleError.length !== 0 || contentError.length !== 0) {
      setFieldErrors({ title: titleError, content: contentError });
      return false;
    }

    return true;
  }

  async function handleAddThread() {
    if (!validateData()) return;

    setIsLoading(true);

    const addThreadRequest: AddLoungeThreadRequest = {
      ...threadData,
      authorId: mainContext.userData!!.id,
      authorUsername: mainContext.userData!!.username,
    };

    const response = await addThread(addThreadRequest);

    if (HttpResponse.isSuccess(response)) {
      navigation.navigate("MainTabs", {
        screen: "TravelerLounge",
        params: { refetchKey: new Date().getTime() },
      });
    } else if (HttpResponse.isError(response)) {
      Alert.alert("An error occurred", response.error);
    }

    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsArea}>
        <View style={styles.threadTypeView}>
          <Text style={styles.threadTypeLabel}>Thread type</Text>
          <View style={styles.typesListView}>
            {Object.values(ThreadType).map((type) => (
              <ThreadTypeComponent
                key={type}
                type={type}
                icon={getThreadTypeIcon(type)}
                isSelected={threadData.threadType === type}
                onClick={() => handleFieldUpdate("threadType", type)}
              />
            ))}
          </View>
        </View>
        <Input
          label="Thread title"
          onChangeText={(title) => handleFieldUpdate("title", title)}
          flat
          borderRadius={24}
          borderWidth={1}
          borderColor={Colors.primary}
          marginBottom={24}
          errorText={fieldError.title}
        />
        <Input
          label="Thread content"
          onChangeText={(content) => handleFieldUpdate("content", content)}
          flat
          borderRadius={24}
          borderWidth={1}
          borderColor={Colors.primary}
          marginBottom={24}
          height={100}
          multiline
          blurOnSubmit
          errorText={fieldError.content}
        />

        <CustomButton
          color={Colors.secondary}
          label="Add thread"
          onTap={handleAddThread}
          customStyle={styles.button}
        />
      </View>
      <LoadingOverlay label="Adding thread..." isVisible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  inputsArea: {
    marginTop: 24,
    width: "80%",
  },
  threadTypeLabel: {
    fontSize: 18,
  },
  threadTypeView: {
    marginBottom: 24,
  },
  typesListView: {
    flexDirection: "row",
  },
  button: {},
});

export default AddThreadScreen;
