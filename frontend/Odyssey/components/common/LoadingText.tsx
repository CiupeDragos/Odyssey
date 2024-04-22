import { StyleSheet, View, Text } from "react-native";

type LoadingTextProps = {
  text: string;
};

function LoadingText({ text }: LoadingTextProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default LoadingText;
