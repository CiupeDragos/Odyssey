import { View, StyleSheet, Image, Alert } from "react-native";
import {
  EditProfileNavProp,
  EditProfileRouteProp,
} from "../../../types/navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BASE_URL, Colors } from "../../../util/constants";
import { useState } from "react";
import CustomButton from "../../../components/common/CustomButton";
import HorizontalRule from "../../../components/common/HorizontalRule";
import Input from "../../../components/common/Input";
import KeyboardAvoidingContainer from "../../../components/common/KeyboardAvoidingContainer";
import VisitedCountries from "../../../components/main/profile/VisitedCountries";
import { ProfileUpdateRequest } from "../../../types/request-types";
import ImagePicker from "../../../components/common/ImagePicker";
import { updateUserProfile } from "../../../http/profile-methods";
import { HttpResponse } from "../../../http/HttpResponse";

type ProfileFields = {
  country: string;
  favoriteCountry: string;
  description: string;
  base64Photo: string;
  visitedCountries: Array<string>;
};

type ProfileFieldKey =
  | "country"
  | "favoriteCountry"
  | "description"
  | "base64Photo";

function EditProfileScreen() {
  const route = useRoute<EditProfileRouteProp>();
  const navigation = useNavigation<EditProfileNavProp>();

  const profileData = route.params;
  const defaultPhotoUri = `${BASE_URL}/profile/${profileData.userId}.jpg`;
  const [updatedFields, setUpdatedFields] = useState<ProfileFields>({
    ...profileData,
    base64Photo: "",
  });

  function updateFields(field: ProfileFieldKey, value: string) {
    setUpdatedFields((curFields) => ({
      ...curFields,
      [field]: value,
    }));
  }

  function updateVisitedCountries(updatedCountries: Array<string>) {
    setUpdatedFields((curFields) => ({
      ...curFields,
      visitedCountries: updatedCountries,
    }));
  }

  async function saveChanges() {
    const profileUpdateRequest: ProfileUpdateRequest = {
      userId: profileData.userId,
      base64Photo: updatedFields.base64Photo,
      country: updatedFields.country,
      favoriteCountry: updatedFields.favoriteCountry,
      description: updatedFields.description,
      visitedCountries: updatedFields.visitedCountries,
    };

    console.log();
    const updateProfileRequest = await updateUserProfile(profileUpdateRequest);

    if (HttpResponse.isSuccess(updateProfileRequest)) {
      navigation.popToTop();
      navigation.replace("MainTabs", { screen: "Profile" });
    } else if (HttpResponse.isError(updateProfileRequest)) {
      Alert.alert(updateProfileRequest.error);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingContainer>
        <View style={styles.photoView}>
          <Image
            style={styles.photo}
            source={
              updatedFields.base64Photo.length === 0
                ? { uri: defaultPhotoUri }
                : { uri: `data:image/png;base64,${updatedFields.base64Photo}` }
            }
          />
          <ImagePicker
            label="Pick photo"
            onPick={(base64img) => {
              updateFields("base64Photo", base64img);
            }}
            customStyle={styles.pickButton}
          />
        </View>
        <HorizontalRule />
        <View style={styles.inputsView}>
          <View style={styles.countriesCount}>
            <VisitedCountries
              visitedCountries={updatedFields.visitedCountries}
              editMode
              onUpdate={updateVisitedCountries}
            />
          </View>
          <Input
            label="Your country"
            placeholder="Enter your country"
            onChangeText={(value) => {
              updateFields("country", value);
            }}
            flat
            borderRadius={24}
            borderColor={Colors.primary}
            borderWidth={1}
            customStyle={styles.inputField}
            value={updatedFields.country}
            marginBottom={12}
          />
          <Input
            label="Your favorite country"
            placeholder="Enter your favorite country"
            onChangeText={(value) => {
              updateFields("favoriteCountry", value);
            }}
            borderRadius={24}
            borderColor={Colors.primary}
            borderWidth={1}
            customStyle={styles.inputField}
            flat
            value={updatedFields.favoriteCountry}
            marginBottom={12}
          />
          <Input
            label="Your profile description"
            onChangeText={(value) => {
              updateFields("description", value);
            }}
            multiline={true}
            customStyle={styles.textAreaInputField}
            blurOnSubmit={true}
            borderRadius={24}
            borderColor={Colors.primary}
            borderWidth={1}
            flat
            height={100}
            value={updatedFields.description}
            marginBottom={12}
          />

          <CustomButton
            color={Colors.secondary}
            label="Save changes"
            onTap={saveChanges}
            elevated
            customStyle={styles.actionButton}
          />
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  actionRow: {
    width: "80%",
    flexDirection: "row",
    marginTop: 24,
    justifyContent: "space-around",
  },
  visitedCountriesPreview: {
    width: "80%",
  },
  photo: {
    height: "70%",
    width: "45%",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  photoView: {
    height: 265,
    alignItems: "center",
    justifyContent: "center",
  },
  inputsView: {
    flex: 2,
    alignItems: "center",
    paddingTop: 12,
  },
  pickButton: {
    width: "50%",
    marginTop: 12,
  },
  inputField: {
    width: "80%",
  },
  textAreaInputField: {
    marginTop: 0,
    width: "80%",
    height: "20%",
  },
  countriesCount: {
    width: "80%",
    marginBottom: 8,
  },
  actionButton: {
    width: "80%",
    marginTop: 45,
  },
});

export default EditProfileScreen;
