import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Button, StyleSheet, View } from "react-native";
import { MainContext } from "../../../store/MainContext";
import ProfileHeader from "../../../components/main/profile/ProfileHeader";
import { ProfileScreenRouteProp } from "../../../types/navigation";
import { ProfileData } from "../../../http/response-types";
import { getProfileData } from "../../../http/profile-methods";
import { HttpResponse } from "../../../http/HttpResponse";
import HorizontalRule from "../../../components/common/HorizontalRule";

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
};

function ProfileScreen({ route }: ProfileScreenProps) {
  const mainContext = useContext(MainContext);
  const [profileData, setProfileData] = useState<ProfileData | undefined>();

  const curUserId = mainContext.userData!!.id;
  let visitedUserId = route.params?.userId ?? curUserId;

  useEffect(() => {
    async function loadProfileData() {
      const response = await getProfileData(visitedUserId);

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
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ProfileHeader
        visitedUserId={visitedUserId}
        isPersonalProfile={curUserId === visitedUserId}
        profileData={profileData}
      />
      <HorizontalRule />
      <Button title="Logout" onPress={mainContext.logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
