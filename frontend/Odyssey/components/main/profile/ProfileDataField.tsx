import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

type ProfileDataFieldProps = {
  fieldLabel: string;
  children: ReactNode;
};

function ProfileDataField({ fieldLabel, children }: ProfileDataFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.fieldLabel}>{fieldLabel}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333333",
  },
});

export default ProfileDataField;
