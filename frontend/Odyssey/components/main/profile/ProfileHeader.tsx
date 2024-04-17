import { Image, View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import CountIndicator from "./CountIndicator";
import CustomButton from "../../common/CustomButton";
import { Colors } from "../../../util/constants";
import { SafeAreaView } from "react-native";
import { MainContext } from "../../../store/MainContext";
import { ProfileData } from "../../../http/response-types";

type ProfileHeaderProps = {
  visitedUserId: string;
  isPersonalProfile: boolean;
  profileData: ProfileData;
};

function ProfileHeader({
  visitedUserId,
  isPersonalProfile,
  profileData,
}: ProfileHeaderProps) {
  const mainContext = useContext(MainContext);

  function handleFollow() {
    // To be implemented
  }

  function handleEditProfile() {
    // To be implemented
  }

  console.log(profileData);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.pictureRow}>
          <Image
            style={styles.image}
            source={{
              uri: "https://lh4.googleusercontent.com/proxy/XZjBQs671YZjpKSHu4nOdgKygc5oteGGQ4nznFtymv2Vr1t6lHDdhqPe-Pk-8IJe7pW4AhhKOTWRVt_b6G4qHF92n7Z1QCMVCNXCP2yayQrC-6Fichft",
            }}
          />
          <View style={styles.countersView}>
            <CountIndicator
              label="posts"
              count={profileData.locationPosts.length}
            />
            <CountIndicator
              label="followers"
              count={profileData.followers.length}
            />
            <CountIndicator
              label="following"
              count={profileData.following.length}
            />
          </View>
        </View>
        <View style={styles.usernameRow}>
          <Text style={styles.usernameLabel}>{profileData.username}</Text>
        </View>
        <View style={styles.actionsRow}>
          {!isPersonalProfile && (
            <CustomButton
              color={Colors.secondary}
              label="Follow"
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  pictureRow: {
    flexDirection: "row",
    paddingLeft: 24,
  },
  image: {
    flex: 1,
    height: 90,
    borderRadius: 60,
    resizeMode: "cover",
  },
  countersView: {
    flexDirection: "row",
    flex: 3,
    marginLeft: 6,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  usernameRow: {
    marginTop: 4,
    paddingLeft: 24,
  },
  usernameLabel: {
    fontSize: 18,
    fontWeight: "500",
  },
  actionsRow: {
    marginTop: 8,
    alignItems: "center",
  },
  actionButton: {
    width: "90%",
  },
});

export default ProfileHeader;
