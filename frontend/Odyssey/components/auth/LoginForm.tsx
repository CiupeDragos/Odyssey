import { Pressable, StyleSheet, Text, View } from "react-native";
import Input from "../common/Input";
import CustomButton from "../common/CustomButton";
import { Colors } from "../../util/constants";
import { useContext, useState } from "react";
import { loginAccount } from "../../http/auth-methods";
import { HttpResponse } from "../../http/HttpResponse";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationProp } from "../../types/navigation";
import { MainContext } from "../../store/MainContext";
import { Ionicons } from "@expo/vector-icons";
import AuthButton from "../common/AuthButton";

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
  const navigation = useNavigation<AuthNavigationProp>();
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
      mainContext.login(response.data);
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
        <Text style={styles.loginText}>Log in to your account</Text>
        <Input
          onChangeText={(text) => handleInputChange("username", text)}
          customStyle={styles.input}
          inputMode="text"
          placeholder="Enter your username"
          borderRadius={30}
          height={50}
          icon={<Ionicons name="person" size={24} color="gray" />}
        />
        <Input
          onChangeText={(text) => handleInputChange("password", text)}
          customStyle={styles.input}
          inputMode="text"
          secureTextEntry
          placeholder="Enter your password"
          borderRadius={30}
          height={50}
          icon={<Ionicons name="lock-closed" size={24} color="gray" />}
        />

        {loginResponse && <Text style={styles.response}>{loginResponse}</Text>}

        <View style={styles.actionButtonView}>
          <AuthButton
            label={!isLoading ? "Log in" : "Loading..."}
            onClick={handleLogin}
          />
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.registerText}>Don't have an account yet?</Text>
        <Pressable onPress={handleRegisterNavigation}>
          <Text style={styles.registerActionText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    height: "55%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: "15%",
    alignItems: "center",
  },
  input: {
    width: "80%",
  },
  response: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 4,
    color: Colors.errorText,
  },
  actionButtonView: {
    width: "80%",
    alignItems: "flex-end",
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

export default LoginForm;
