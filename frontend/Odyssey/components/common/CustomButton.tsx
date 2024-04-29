import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

type CustomButtonProps = {
  color: string;
  label: string;
  outlined?: boolean;
  elevated?: true;
  customStyle?: ViewStyle;
  onTap: () => void;
};

function CustomButton({
  color,
  label,
  outlined,
  elevated,
  customStyle,
  onTap,
}: CustomButtonProps) {
  return (
    <View style={[customStyle, elevated && styles.elevatedButton]}>
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
    justifyContent: "center",
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
  elevatedButton: {
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
  },
});

export default CustomButton;
