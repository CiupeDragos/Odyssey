import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../../components/common/Input";
import { searchForUsers } from "../../../http/other";
import { HttpResponse } from "../../../http/HttpResponse";
import { Follower } from "../../../types/response-types";
import { useState } from "react";
import SearchUsersResult from "../../../components/main/search/SearchUsersResult";

function SearchScreen() {
  const [usersResult, setUsersResult] = useState<Array<Follower>>();
  const [isSearching, setIsSearching] = useState(false);
  const [curSearchQuery, setCurSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  let informationText = "";
  if (!usersResult && !isSearching) {
    informationText = "Start searching for users";
  } else if (isSearching) {
    informationText = "Searching...";
  } else {
    if (curSearchQuery.length === 0)
      informationText = "Start searching for users";
    else informationText = "No users found!";
  }

  async function handleSearch(searchQuery: string) {
    setIsSearching(true);
    setCurSearchQuery(searchQuery);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const curTimeout = setTimeout(async () => {
      const response = await searchForUsers(searchQuery);

      if (HttpResponse.isSuccess(response)) {
        setUsersResult(response.data);
        console.log(response.data);
      } else if (HttpResponse.isError(response)) {
        Alert.alert("An error occurred", response.error);
      }

      setIsSearching(false);
      setSearchTimeout(undefined);
    }, 700);

    setSearchTimeout(curTimeout);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Input
        onChangeText={handleSearch}
        flat
        borderRadius={24}
        inputBackgroundColor="#ebe9e8"
        customStyle={styles.searchBar}
        icon={<Ionicons name="search" size={24} />}
        placeholder="Search for any username"
      />
      <View style={styles.resultContainer}>
        {(!usersResult || usersResult.length === 0 || isSearching) && (
          <Text style={styles.informationLabel}>{informationText}</Text>
        )}

        {usersResult && !isSearching && (
          <SearchUsersResult users={usersResult} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  searchBar: {
    width: "90%",
  },
  resultContainer: {
    flex: 1,
    width: "90%",
  },
  informationLabel: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 22,
  },
});

export default SearchScreen;
