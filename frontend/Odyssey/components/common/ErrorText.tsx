import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../util/constants";

type ErrorTextProps = {
  errorMessage: string;
};

function ErrorText({ errorMessage }: ErrorTextProps) {
  return errorMessage.length !== 0 ? (
    <Text style={styles.message}>{errorMessage}</Text>
  ) : (
    <View></View>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    color: Colors.errorText,
    marginBottom: 6,
  },
});

export default ErrorText;
