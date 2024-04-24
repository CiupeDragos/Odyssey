import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, Button, ScrollView, StyleSheet, View } from "react-native";
import { MainContext } from "../../../store/MainContext";
import ProfileHeader from "../../../components/main/profile/ProfileHeader";
import { ProfileScreenRouteProp } from "../../../types/navigation";
import { ProfileData } from "../../../http/response-types";
import { getProfileData } from "../../../http/profile-methods";
import { HttpResponse } from "../../../http/HttpResponse";
import ProfileInformation from "../../../components/main/profile/ProfileInformation";
import { Colors } from "../../../util/constants";
import LoadingText from "../../../components/common/LoadingText";

type ProfileScreenProps = {
  route: ProfileScreenRouteProp;
};

const defaultProfileData: ProfileData = {
  birthTimestamp: 0,
  country: "",
  favoriteCountry: "",
  followers: [],
  following: [],
  locationPosts: [],
  profileDescription: "",
  realName: "",
  username: "",
  visitedCountries: [],
  requesterFollowing: [],
};

function ProfileScreen({ route }: ProfileScreenProps) {
  const mainContext = useContext(MainContext);
  const [profileData, setProfileData] = useState<ProfileData | undefined>();

  const curUserId = mainContext.userData!!.id;
  const visitedUserId = route.params?.userId ?? curUserId;

  console.log(visitedUserId);

  useEffect(() => {
    async function loadProfileData() {
      const response = await getProfileData(visitedUserId, curUserId);

      if (HttpResponse.isSuccess(response)) {
        setProfileData(response.data);
      } else if (HttpResponse.isError(response)) {
        setProfileData(defaultProfileData);
        console.log(response.error);
      }
    }

    loadProfileData();
  }, []);

  if (!profileData) {
    return <LoadingText text="Loading profile data..." />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.scrollableArea}>
        <View style={styles.headerArea}>
          <ProfileHeader
            curUserId={curUserId}
            visitedUserId={visitedUserId}
            profileData={profileData}
          />
        </View>
        <View style={styles.mainArea}>
          <ProfileInformation profileData={profileData} />
          <Button title="Logout" onPress={mainContext.logout} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollableArea: {
    flex: 1,
  },
  headerArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  mainArea: {
    flex: 1.5,
  },
});

export default ProfileScreen;
