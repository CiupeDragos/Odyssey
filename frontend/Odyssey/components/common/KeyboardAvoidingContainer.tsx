import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from "react-native";

type KeyboardAvoidingContainerProps = {
  children: ReactNode;
  customStyle?: ViewStyle;
  scrollingEnabled?: boolean;
};

function KeyboardAvoidingContainer({
  children,
  customStyle,
  scrollingEnabled,
}: KeyboardAvoidingContainerProps) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={[{ flexGrow: 1 }, customStyle]}
        scrollEnabled={scrollingEnabled ?? true}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default KeyboardAvoidingContainer;
