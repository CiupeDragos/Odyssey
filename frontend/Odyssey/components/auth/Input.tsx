import { StyleSheet, Text, TextInput, View } from "react-native";

type InputProps = {
  label: string;
};

function Input({ label }: InputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 16,
  },
  innerContainer: {
    width: "85%",
  },
  input: {
    backgroundColor: "#dbdad5",
    borderRadius: 12,
    height: 35,
    padding: 4,
    paddingLeft: 8,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
    marginLeft: 1,
  },
});

export default Input;
