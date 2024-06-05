import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../common/Input";
import CustomButton from "../common/CustomButton";
import { Colors } from "../../util/constants";
import { useState } from "react";
import {
  validateBirthdayTimestamp,
  validateConfirmPassword,
  validateCountry,
  validateGender,
  validatePassword,
  validateRealName,
  validateUsername,
} from "../../util/credentialsValidation";
import { registerAccount } from "../../http/auth-methods";
import { HttpResponse } from "../../http/HttpResponse";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProp } from "../../types/navigation";
import BirthDateInput from "./BirthDateInput";
import KeyboardAvoidingContainer from "../common/KeyboardAvoidingContainer";
import { Ionicons } from "@expo/vector-icons";
import AuthButton from "../common/AuthButton";
import { Gender } from "../../util/enums";
import GenderPicker from "./GenderPicker";

export type RegisterFields = {
  username: string;
  realName: string;
  birthTimestamp: string;
  country: string;
  password: string;
  confirmPassword: string;
  gender?: Gender;
};

type ErrorFields = Omit<RegisterFields, "gender"> & { gender: string };

type RegisterInputValue =
  | "username"
  | "realName"
  | "birthTimestamp"
  | "country"
  | "password"
  | "confirmPassword"
  | "gender";

const defaultRegisterState: RegisterFields = {
  username: "",
  realName: "",
  birthTimestamp: new Date().getTime().toString(),
  country: "",
  password: "",
  confirmPassword: "",
};

const defaultErrorsState: ErrorFields = {
  username: "",
  realName: "",
  birthTimestamp: "",
  country: "",
  password: "",
  confirmPassword: "",
  gender: "",
};

type RegisterResponse = {
  success: boolean;
  message: string;
};

function RegisterForm() {
  const [inputValues, setInputValues] =
    useState<RegisterFields>(defaultRegisterState);

  const [inputErrors, setInputErrors] =
    useState<ErrorFields>(defaultErrorsState);

  const [isLoading, setIsLoading] = useState(false);
  const [registerResponse, setRegisterResponse] = useState<RegisterResponse>();
  const navigation = useNavigation<AuthNavigationProp>();

  function handleInputChange(
    field: RegisterInputValue,
    value: string | Gender
  ) {
    setInputValues((curFields) => ({ ...curFields, [field]: value }));
  }

  function handleLoginNavigation() {
    navigation.replace("Login");
  }

  async function handleRegistration() {
    if (!areCredentialsValid()) return;

    setIsLoading(true);
    const response = await registerAccount(inputValues);

    if (HttpResponse.isSuccess(response)) {
      setRegisterResponse({ success: true, message: response.data });
      setInputValues(defaultRegisterState);
    } else if (HttpResponse.isError(response)) {
      setRegisterResponse({ success: false, message: response.error });
    }
    setIsLoading(false);
  }

  function areCredentialsValid(): boolean {
    const usernameError = validateUsername(inputValues.username);
    const realNameError = validateRealName(inputValues.realName);
    const birthdayTimestampError = validateBirthdayTimestamp(
      inputValues.birthTimestamp
    );
    const countryError = validateCountry(inputValues.country);
    const passwordError = validatePassword(inputValues.password);
    const confirmPasswordError = validateConfirmPassword(
      inputValues.password,
      inputValues.confirmPassword
    );
    const genderError = validateGender(inputValues.gender);

    setInputErrors(() => {
      const updatedErrors: ErrorFields = {
        username: usernameError,
        realName: realNameError,
        birthTimestamp: birthdayTimestampError,
        country: countryError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        gender: genderError,
      };

      return updatedErrors;
    });

    if (
      usernameError.length != 0 ||
      realNameError.length != 0 ||
      birthdayTimestampError.length != 0 ||
      countryError.length != 0 ||
      passwordError.length != 0 ||
      confirmPasswordError.length != 0 ||
      genderError.length != 0
    ) {
      return false;
    }

    return true;
  }

  return (
    <KeyboardAvoidingContainer customStyle={{ height: 1000 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.registerStaticText}>Create account</Text>
          <Input
            placeholder="Enter your username"
            onChangeText={(text) => handleInputChange("username", text)}
            customStyle={styles.input}
            inputMode="text"
            height={50}
            borderRadius={30}
            icon={<Ionicons name="person" size={24} color="gray" />}
            errorText={inputErrors.username}
            value={inputValues.username}
          />
          <Input
            placeholder="Enter your real name"
            onChangeText={(text) => handleInputChange("realName", text)}
            customStyle={styles.input}
            inputMode="text"
            height={50}
            borderRadius={30}
            icon={<Ionicons name="person" size={24} color="gray" />}
            errorText={inputErrors.realName}
            value={inputValues.realName}
          />
          <Input
            placeholder="Enter your country"
            onChangeText={(text) => handleInputChange("country", text)}
            customStyle={styles.input}
            inputMode="text"
            height={50}
            borderRadius={30}
            icon={<Ionicons name="location" size={24} color="gray" />}
            errorText={inputErrors.country}
            value={inputValues.country}
          />
          <Input
            placeholder="Enter your password"
            onChangeText={(text) => handleInputChange("password", text)}
            customStyle={styles.input}
            inputMode="text"
            secureTextEntry
            height={50}
            borderRadius={30}
            icon={<Ionicons name="lock-closed" size={24} color="gray" />}
            errorText={inputErrors.password}
            value={inputValues.password}
          />
          <Input
            placeholder="Confirm your password"
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            customStyle={styles.input}
            inputMode="text"
            secureTextEntry
            height={50}
            borderRadius={30}
            icon={<Ionicons name="lock-closed" size={24} color="gray" />}
            errorText={inputErrors.confirmPassword}
            value={inputValues.confirmPassword}
          />
          <BirthDateInput
            errorText={inputErrors.birthTimestamp}
            label="Enter your birthdate:"
            onDateChange={(stringTimestamp) =>
              handleInputChange("birthTimestamp", stringTimestamp)
            }
          />
          <GenderPicker
            onPickGender={(gender) => handleInputChange("gender", gender)}
            errorText={inputErrors.gender}
            selectedGender={inputValues.gender}
          />

          {registerResponse && (
            <Text
              style={[
                styles.response,
                registerResponse.success
                  ? styles.responseSuccess
                  : styles.responseError,
              ]}
            >
              {registerResponse.message}
            </Text>
          )}

          <View style={styles.actionButtonView}>
            <AuthButton
              label={!isLoading ? "Register" : "Loading..."}
              onClick={handleRegistration}
            />
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.registerText}>Already have an account?</Text>
          <Pressable onPress={handleLoginNavigation}>
            <Text style={styles.registerActionText}>Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  registerStaticText: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 36,
  },
  innerContainer: {
    width: "80%",
    justifyContent: "flex-end",
    paddingTop: 24,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: "15%",
    alignItems: "center",
  },
  input: {},
  button: {
    width: "40%",
  },
  actionButtonView: {
    alignItems: "flex-end",
  },
  response: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 4,
  },
  responseSuccess: {
    color: Colors.successText,
  },
  responseError: {
    color: Colors.errorText,
  },
  registerText: {
    fontSize: 18,
  },
  registerActionText: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
  loginText: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 36,
  },
});

export default RegisterForm;
