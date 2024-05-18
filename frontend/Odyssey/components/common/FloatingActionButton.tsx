import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type FloatingActionButtonProps = {
  children: ReactNode;
  onClick: () => void;
  customStyle?: ViewStyle;
};

function FloatingActionButton({
  onClick,
  children,
  customStyle,
}: FloatingActionButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        customStyle,
        pressed && styles.pressed,
      ]}
      onPress={onClick}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    shadowColor: "black",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default FloatingActionButton;
