import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  LogBox,
} from "react-native";
import { MainContext } from "../../../store/MainContext";
import ProfileHeader from "../../../components/main/profile/ProfileHeader";
import { ProfileScreenRouteProp } from "../../../types/navigation";
import { ProfileData } from "../../../types/response-types";
import { getProfileData } from "../../../http/profile-methods";
import { HttpResponse } from "../../../http/HttpResponse";
import ProfileInformation from "../../../components/main/profile/ProfileInformation";
import { Colors } from "../../../util/constants";
import LoadingText from "../../../components/common/LoadingText";
import LocationPostsList from "../../../components/main/home/feed/LocationPostsList";
import { Gender } from "../../../util/enums";

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
  gender: Gender.MAN,
};

function ProfileScreen({ route }: ProfileScreenProps) {
  const mainContext = useContext(MainContext);
  const [profileData, setProfileData] = useState<ProfileData | undefined>();

  const curUserId = mainContext.userData!!.id;
  const visitedUserId = route.params?.userId ?? curUserId;
  const modifiedLocationPost = route.params?.modifiedLocationPost ?? undefined;

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

    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    loadProfileData();
  }, []);

  useEffect(() => {
    if (!modifiedLocationPost) return;

    const modifiedPostIndex = profileData!!.locationPosts.findIndex(
      (p) => p.id === modifiedLocationPost.id
    );

    if (modifiedPostIndex === -1) return;

    const modifiedPosts = [...profileData!!.locationPosts];
    modifiedPosts[modifiedPostIndex] = modifiedLocationPost;

    setProfileData((curData) => {
      const curProfileData = curData!!;
      const updatedData: ProfileData = {
        ...curProfileData,
        locationPosts: modifiedPosts,
      };

      return updatedData;
    });
  }, [modifiedLocationPost, setProfileData]);

  if (!profileData) {
    return <LoadingText text="Loading profile data..." />;
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="auto" />
      <SafeAreaView style={styles.scrollableArea}>
        <View style={styles.headerArea}>
          <ProfileHeader
            curUserId={curUserId}
            visitedUserId={visitedUserId}
            profileData={profileData}
          />
        </View>
        <View style={styles.mainArea}>
          <ProfileInformation profileData={profileData} />
        </View>
        <LocationPostsList
          locationPosts={profileData.locationPosts}
          navSource="Profile"
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
  },
  scrollableArea: {
    flex: 1,
    marginTop: 54,
  },
  headerArea: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingBottom: 24,
    paddingTop: 24,
    marginHorizontal: 10,
    borderRadius: 24,
    shadowColor: Colors.primary,
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
  },
  mainArea: {
    flex: 1.5,
  },
});

export default ProfileScreen;
