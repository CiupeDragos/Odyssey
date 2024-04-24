import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../util/constants";

type CountryItemProps = {
  country: string;
  onDelete: () => void;
};

function VisitedCountryItem({ country, onDelete }: CountryItemProps) {
  return (
    <View style={styles.countryItemContainer}>
      <View style={styles.countryItemMargin}></View>
      <View style={styles.countryItemView}>
        <View style={styles.bulletPoint}></View>
        <View style={styles.countryItem}>
          <Text style={styles.countryItemText}>{country}</Text>
          <Pressable onPress={onDelete}>
            <AntDesign name="delete" size={24} color={Colors.errorText} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  countryItemText: {
    fontSize: 24,
    fontWeight: "400",
  },
  countryItemContainer: {
    flexDirection: "row",
    marginBottom: 6,
  },
  countryItemView: {
    flex: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  countryItemMargin: {
    flex: 1,
  },
  bulletPoint: {
    marginRight: 6,
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  countryItem: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default VisitedCountryItem;
