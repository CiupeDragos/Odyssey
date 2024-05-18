import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../util/constants";

type AuthButtonProps = {
  label: string;
  onClick: () => void;
};

function AuthButton({ label, onClick }: AuthButtonProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={({ pressed }) => [styles.iconView, pressed && styles.pressed]}
        onPress={onClick}
      >
        <AntDesign name="arrowright" size={32} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  iconView: {
    backgroundColor: Colors.secondary,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  label: {
    fontSize: 28,
    fontWeight: "400",
    marginRight: 12,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default AuthButton;
