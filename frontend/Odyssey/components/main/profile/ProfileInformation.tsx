import { View, StyleSheet, Text } from "react-native";
import { ProfileData } from "../../../types/response-types";
import ProfileDataField from "./ProfileDataField";
import { getYearsFromTimestamp } from "../../../util/commonMethods";
import VisitedCountries from "./VisitedCountries";

type ProfileInformationProps = {
  profileData: ProfileData;
};

function ProfileInformation({ profileData }: ProfileInformationProps) {
  if (profileData.country.length == 0) {
    profileData.country = "Not specified";
  }

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
        <Text style={styles.textValue}>
          {getYearsFromTimestamp(profileData.birthTimestamp)}
        </Text>
      </ProfileDataField>

      <ProfileDataField fieldLabel="Currently living in">
        <Text style={styles.textValue}>{profileData.country}</Text>
      </ProfileDataField>

      <ProfileDataField fieldLabel="Favorite country">
        <Text style={styles.textValue}>{profileData.favoriteCountry}</Text>
      </ProfileDataField>

      <View style={styles.visitedCountries}>
        <VisitedCountries visitedCountries={profileData.visitedCountries} />
      </View>

      <ProfileDataField fieldLabel="About me">
        <Text style={styles.textValue}>{profileData.profileDescription}</Text>
      </ProfileDataField>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 12,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.15,
    padding: 12,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 12,
    backgroundColor: "white",
  },
  personalDetails: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333333",
  },
  descriptionArea: {
    marginTop: 12,
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
  visitedCountries: {
    marginTop: 3,
  },
});

export default ProfileInformation;
