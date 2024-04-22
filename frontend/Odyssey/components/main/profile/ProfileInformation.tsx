import { View, StyleSheet, Text } from "react-native";
import { ProfileData } from "../../../http/response-types";
import ProfileDataField from "./ProfileDataField";

type ProfileInformationProps = {
  profileData: ProfileData;
};

function ProfileInformation({ profileData }: ProfileInformationProps) {
  if (profileData.favoriteCountry.length == 0) {
    profileData.favoriteCountry = "Not specified";
  }

  if (profileData.profileDescription.length == 0) {
    profileData.profileDescription = "Not specified";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.personalDetails}>PERSONAL DETAILS</Text>
      <ProfileDataField fieldLabel="Real name">
        <Text style={styles.textValue}>{profileData.realName}</Text>
      </ProfileDataField>

      <ProfileDataField fieldLabel="Age">
        <Text style={styles.textValue}>21</Text>
      </ProfileDataField>

      <ProfileDataField fieldLabel="Currently living in">
        <Text style={styles.textValue}>{profileData.country}</Text>
      </ProfileDataField>

      <ProfileDataField fieldLabel="Favorite country">
        <Text style={styles.textValue}>{profileData.favoriteCountry}</Text>
      </ProfileDataField>

      <ProfileDataField fieldLabel="Countries visited">
        <Text style={styles.textValue}>Will create component</Text>
      </ProfileDataField>

      <ProfileDataField fieldLabel="About me">
        <Text style={styles.textValue}>{profileData.profileDescription}</Text>
      </ProfileDataField>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  personalDetails: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333333",
  },
  descriptionArea: {
    marginTop: 8,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333333",
  },
  description: {
    marginTop: 2,
    fontSize: 18,
    color: "#555555",
  },
  textValue: {
    fontSize: 18,
    color: "#555555",
  },
});

export default ProfileInformation;
