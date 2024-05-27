import { StyleSheet, Text, Pressable, View } from "react-native";
import { ThreadType } from "../../../util/enums";
import { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";

type ThreadTypeComponentProps = {
  icon: ReactNode;
  type: ThreadType;
  isSelected: boolean;
  onClick: () => void;
};

function ThreadTypeComponent({
  icon,
  type,
  isSelected,
  onClick,
}: ThreadTypeComponentProps) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selected]}
      onPress={onClick}
    >
      <Text style={styles.typeLabel}>{type}</Text>
      <View style={styles.iconView}>{icon}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 4,
    borderRadius: 12,
    marginTop: 4,
    marginRight: 8,
    alignItems: "center",
  },
  typeLabel: {
    fontSize: 18,
  },
  iconView: {
    marginLeft: 4,
  },
  selected: {
    backgroundColor: "lightblue",
  },
});

export default ThreadTypeComponent;
