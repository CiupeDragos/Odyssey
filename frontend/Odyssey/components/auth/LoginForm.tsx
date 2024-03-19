import { StyleSheet, Text, View } from "react-native";
import Input from "../common/Input";
import CustomButton from "../common/CustomButton";
import { Colors } from "../../util/constants";
import { useContext, useState } from "react";
import { loginAccount } from "../../http/auth-methods";
import { HttpResponse } from "../../http/HttpResponse";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../types/navigation";
import { MainContext } from "../../store/MainContext";

type LoginInputValue = "username" | "password";

type LoginFields = {
  username: string;
  password: string;
};

const defaultLoginState: LoginFields = {
  username: "",
  password: "",
};

function LoginForm() {
  const [inputValues, setInputValues] =
    useState<LoginFields>(defaultLoginState);

  const [isLoading, setIsLoading] = useState(false);
  const [loginResponse, setLoginResponse] = useState<string>();
  const navigation = useNavigation<RootNavigationProp>();
  const mainContext = useContext(MainContext);

  function handleInputChange(field: LoginInputValue, value: string) {
    setInputValues((curFields) => ({ ...curFields, [field]: value }));
  }

  function handleRegisterNavigation() {
    navigation.replace("Register");
  }

  async function handleLogin() {
    if (!areCredentialsValid()) return;

    setIsLoading(true);
    const response = await loginAccount(
      inputValues.username,
      inputValues.password
    );

    if (HttpResponse.isSuccess(response)) {
      mainContext.login("Proper data will be returned from backend");
    } else if (HttpResponse.isError(response)) {
      setLoginResponse(response.error);
    }
    setIsLoading(false);
  }

  function areCredentialsValid(): boolean {
    if (inputValues.username.length == 0 || inputValues.password.length == 0) {
      setLoginResponse("Username or password can't be empty");
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
        />
        <Input
          label="Enter your password"
          onChangeText={(text) => handleInputChange("password", text)}
          customStyle={styles.input}
          inputMode="text"
          secureTextEntry
          borderColor={Colors.primary}
          borderWidth={1.5}
        />
      </View>

      {loginResponse && <Text style={styles.response}>{loginResponse}</Text>}

      <View style={styles.actionsContainer}>
        <CustomButton
          color={Colors.secondary}
          label="Go to register"
          onTap={handleRegisterNavigation}
          outlined
          customStyle={styles.button}
        />
        <CustomButton
          color={Colors.secondary}
          label={isLoading ? "Loading..." : "Login"}
          onTap={handleLogin}
          customStyle={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    height: "45%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-evenly",
  },
  input: {
    width: "80%",
  },
  button: {
    width: "40%",
  },
  response: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 4,
    color: Colors.errorText,
  },
});

export default LoginForm;
