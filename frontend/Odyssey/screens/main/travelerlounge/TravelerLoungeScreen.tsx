import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Alert,
  FlatList,
} from "react-native";
import FloatingActionButton from "../../../components/common/FloatingActionButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../util/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  LoungeScreenNavProp,
  LoungeScreenRouteProp,
} from "../../../types/navigation";
import { LoungeThread } from "../../../types/response-types";
import { getThreads as getAllThreads } from "../../../http/lounge";
import { HttpResponse } from "../../../http/HttpResponse";
import LoadingText from "../../../components/common/LoadingText";
import ThreadComponent from "../../../components/main/lounge/ThreadComponent";

function TravelerLoungeScreen() {
  const navigation = useNavigation<LoungeScreenNavProp>();
  const route = useRoute<LoungeScreenRouteProp>();
  const [threads, setThreads] = useState<Array<LoungeThread>>();
  const refetchKey = route.params?.refetchKey ?? undefined;
  const modifiedThread = route.params?.modifiedThread ?? undefined;

  async function getThreads() {
    const response = await getAllThreads();

    if (HttpResponse.isSuccess(response)) {
      response.data.sort((t1, t2) => t2.timestamp - t1.timestamp);
      setThreads(response.data);
    } else if (HttpResponse.isError(response)) {
      Alert.alert("An error occurred", response.error);
    }
  }

  function handleAddThread() {
    navigation.navigate("AddThread");
  }

  useEffect(() => {
    getThreads();
  }, [refetchKey]);

  useEffect(() => {
    if (!modifiedThread || !threads) return;
    const threadIndex = threads.findIndex((t) => t.id === modifiedThread.id);
    const updatedThreads = [...threads];
    updatedThreads[threadIndex] = modifiedThread;

    setThreads(updatedThreads);
  }, [modifiedThread]);

  if (!threads) {
    return <LoadingText text="Loading threads..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addButtonContainer}>
        <FloatingActionButton
          customStyle={styles.addButton}
          onClick={handleAddThread}
        >
          <Ionicons name="add" color="white" size={24} />
        </FloatingActionButton>
      </View>
      <FlatList
        style={styles.threadsList}
        data={threads}
        renderItem={({ item }) => <ThreadComponent thread={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  addButtonContainer: {
    height: "8%",
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 16,
    paddingTop: 4,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: Colors.secondary,
  },
  threadsList: {
    width: "95%",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 24,
  },
});

export default TravelerLoungeScreen;
