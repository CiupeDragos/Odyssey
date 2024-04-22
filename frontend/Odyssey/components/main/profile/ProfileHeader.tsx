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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pictureRow}>
          <Image
            style={styles.image}
            source={{
              uri: "https://lh4.googleusercontent.com/proxy/XZjBQs671YZjpKSHu4nOdgKygc5oteGGQ4nznFtymv2Vr1t6lHDdhqPe-Pk-8IJe7pW4AhhKOTWRVt_b6G4qHF92n7Z1QCMVCNXCP2yayQrC-6Fichft",
            }}
          />
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
