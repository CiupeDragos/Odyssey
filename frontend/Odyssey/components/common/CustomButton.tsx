import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type CustomButtonProps = {
  color: string;
  label: string;
  outlined?: boolean;
  customStyle?: ViewStyle;
  onTap: () => void;
};

function CustomButton({
  color,
  label,
  outlined,
  customStyle,
  onTap,
}: CustomButtonProps) {
  return (
    <View style={[customStyle]}>
      <Pressable
        onPress={onTap}
        style={({ pressed }) => [
          styles.pressable,
          { borderColor: color },
          !outlined && { backgroundColor: color },
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    padding: 8,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  pressable: {
    borderRadius: 8,
    borderWidth: 1.5,
  },
});

export default CustomButton;
