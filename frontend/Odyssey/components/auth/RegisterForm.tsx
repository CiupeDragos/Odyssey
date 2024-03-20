import { StyleSheet, Text, View } from "react-native";
import Input from "../common/Input";
import CustomButton from "../common/CustomButton";
import { Colors } from "../../util/constants";
import { useState } from "react";
import {
  validateBirthdayTimestamp,
  validateConfirmPassword,
  validateCountry,
  validatePassword,
  validateRealName,
  validateUsername,
} from "../../util/credentialsValidation";
import { registerAccount } from "../../http/auth-methods";
import { HttpResponse } from "../../http/HttpResponse";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProp } from "../../types/navigation";
import BirthDateInput from "./BirthDateInput";

export type RegisterFields = {
  username: string;
  realName: string;
  birthTimestamp: string;
  country: string;
  password: string;
  confirmPassword: string;
};

type RegisterInputValue =
  | "username"
  | "realName"
  | "birthTimestamp"
  | "country"
  | "password"
  | "confirmPassword";

const defaultRegisterState: RegisterFields = {
  username: "",
  realName: "",
  birthTimestamp: new Date().getTime().toString(),
  country: "",
  password: "",
  confirmPassword: "",
};

const defaultErrorsState: RegisterFields = {
  username: "",
  realName: "",
  birthTimestamp: "",
  country: "",
  password: "",
  confirmPassword: "",
};

type RegisterResponse = {
  success: boolean;
  message: string;
};

function RegisterForm() {
  const [inputValues, setInputValues] =
    useState<RegisterFields>(defaultRegisterState);

  const [inputErrors, setInputErrors] =
    useState<RegisterFields>(defaultErrorsState);

  const [isLoading, setIsLoading] = useState(false);
  const [registerResponse, setRegisterResponse] = useState<RegisterResponse>();
  const navigation = useNavigation<AuthNavigationProp>();

  function handleInputChange(field: RegisterInputValue, value: string) {
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

    setInputErrors(() => {
      const updatedErrors: RegisterFields = {
        username: usernameError,
        realName: realNameError,
        birthTimestamp: birthdayTimestampError,
        country: countryError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      };

      return updatedErrors;
    });

    if (
      usernameError.length != 0 ||
      realNameError.length != 0 ||
      birthdayTimestampError.length != 0 ||
      countryError.length != 0 ||
      passwordError.length != 0 ||
      confirmPasswordError.length != 0
    ) {
      return false;
    }

    return true;
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Input
          label="Enter your username"
          onChangeText={(text) => handleInputChange("username", text)}
          customStyle={styles.input}
          inputMode="text"
          borderColor={Colors.primary}
          borderWidth={1.5}
          errorText={inputErrors.username}
          value={inputValues.username}
        />
        <BirthDateInput
          errorText={inputErrors.birthTimestamp}
          onDateChange={(stringTimestamp) =>
            handleInputChange("birthTimestamp", stringTimestamp)
          }
        />
        <Input
          label="Enter your real name"
          onChangeText={(text) => handleInputChange("realName", text)}
          customStyle={styles.input}
          inputMode="text"
          borderColor={Colors.primary}
          borderWidth={1.5}
          errorText={inputErrors.realName}
          value={inputValues.realName}
        />
        <Input
          label="Enter your country"
          onChangeText={(text) => handleInputChange("country", text)}
          customStyle={styles.input}
          inputMode="text"
          borderColor={Colors.primary}
          borderWidth={1.5}
          errorText={inputErrors.country}
          value={inputValues.country}
        />
        <Input
          label="Enter your password"
          onChangeText={(text) => handleInputChange("password", text)}
          customStyle={styles.input}
          inputMode="text"
          secureTextEntry
          borderColor={Colors.primary}
          borderWidth={1.5}
          errorText={inputErrors.password}
          value={inputValues.password}
        />
        <Input
          label="Confirm your password"
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
          customStyle={styles.input}
          inputMode="text"
          secureTextEntry
          borderColor={Colors.primary}
          borderWidth={1.5}
          errorText={inputErrors.confirmPassword}
          value={inputValues.confirmPassword}
        />
      </View>

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

      <View style={styles.actionsContainer}>
        <CustomButton
          color={Colors.secondary}
          label="Go to login"
          onTap={handleLoginNavigation}
          outlined
          customStyle={styles.button}
        />
        <CustomButton
          color={Colors.secondary}
          label={isLoading ? "Loading..." : "Register"}
          onTap={handleRegistration}
          customStyle={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  innerContainer: {
    width: "80%",
    height: "70%",
    justifyContent: "flex-end",
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: 12,
    width: "90%",
    justifyContent: "space-evenly",
  },
  input: {},
  button: {
    width: "40%",
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
});

export default RegisterForm;
