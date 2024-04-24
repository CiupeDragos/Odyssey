import { Image, View, Text, StyleSheet, Alert } from "react-native";
import { useContext, useState } from "react";
import CountIndicator from "./CountIndicator";
import CustomButton from "../../common/CustomButton";
import { BASE_URL, Colors } from "../../../util/constants";
import { SafeAreaView } from "react-native";
import { MainContext } from "../../../store/MainContext";
import { Follower, ProfileData } from "../../../http/response-types";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavProp } from "../../../types/navigation";
import { followUser } from "../../../http/profile-methods";
import { HttpResponse } from "../../../http/HttpResponse";

type ProfileHeaderProps = {
  curUserId: string;
  visitedUserId: string;
  profileData: ProfileData;
};

function ProfileHeader({
  curUserId,
  visitedUserId,
  profileData,
}: ProfileHeaderProps) {
  const mainContext = useContext(MainContext);
  const navigation = useNavigation<ProfileScreenNavProp>();
  const [visitorFollowing, setVisitorFollowing] = useState(
    profileData.requesterFollowing
  );
  const [visitedFollowers, setVisitedFollowers] = useState(
    profileData.followers
  );
  const following = !!visitorFollowing.find((f) => f.userId === visitedUserId);
  const isPersonalProfile = curUserId === visitedUserId;

  function navigateToFollowers() {
    navigation.push("Followers", {
      username: profileData.username,
      followers: visitedFollowers,
    });
  }

  function navigateToFollowing() {
    navigation.push("Following", {
      username: profileData.username,
      following: profileData.following,
    });
  }

  async function handleFollow() {
    const followResponse = await followUser({
      fromUserId: curUserId,
      toUserId: visitedUserId,
    });

    if (HttpResponse.isError(followResponse)) {
      Alert.alert("An unknown error occurred, try again");
      return;
    }

    if (following) {
      setVisitorFollowing((curList) => {
        const newList = curList.filter((f) => f.userId !== visitedUserId);
        return newList;
      });

      setVisitedFollowers((curList) => {
        const newList = curList.filter((f) => f.userId !== curUserId);
        return newList;
      });
    } else {
      setVisitorFollowing((curList) => [
        ...curList,
        { userId: visitedUserId, username: profileData.username },
      ]);

      setVisitedFollowers((curList) => [
        ...curList,
        { userId: curUserId, username: mainContext.userData!!.username },
      ]);
    }
  }

  function handleEditProfile() {
    navigation.navigate("EditProfile", {
      userId: curUserId,
      country: profileData.country,
      favoriteCountry: profileData.favoriteCountry,
      visitedCountries: profileData.visitedCountries,
      description: profileData.profileDescription,
    });
  }

  console.log(profileData);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pictureRow}>
          <Image
            style={styles.image}
            source={{
              uri: `${BASE_URL}/profile/${visitedUserId}.jpg`,
            }}
          />
        </View>

        <View style={styles.usernameRow}>
          <Text style={styles.usernameLabel}>{profileData.username}</Text>
        </View>

        <View style={styles.actionsRow}>
          {!isPersonalProfile && (
            <CustomButton
              color={!following ? Colors.secondary : "lightgray"}
              label={!following ? "Follow" : "Unfollow"}
              onTap={handleFollow}
              customStyle={styles.actionButton}
            />
          )}

          {isPersonalProfile && (
            <CustomButton
              color={Colors.secondary}
              label="Edit your profile"
              onTap={handleEditProfile}
              outlined={isPersonalProfile ? false : true}
              customStyle={styles.actionButton}
            />
          )}
        </View>

        <View style={styles.countersView}>
          <CountIndicator
            label="posts"
            count={profileData.locationPosts.length}
          />
          <CountIndicator
            label="followers"
            count={visitedFollowers.length}
            onClick={navigateToFollowers}
          />
          <CountIndicator
            label="following"
            count={profileData.following.length}
            onClick={navigateToFollowing}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  pictureRow: {
    alignItems: "center",
  },
  image: {
    width: "42%",
    height: 170,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
  },
  countersView: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  usernameRow: {
    marginTop: 6,
    alignItems: "center",
  },
  usernameLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  actionsRow: {
    marginTop: 16,
    alignItems: "center",
  },
  actionButton: {
    width: "55%",
  },
});

export default ProfileHeader;
