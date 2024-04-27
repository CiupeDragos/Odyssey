import { StyleSheet, View } from "react-native";

function HorizontalRule() {
  return <View style={styles.horizontalRule}></View>;
}

const styles = StyleSheet.create({
  horizontalRule: {
    marginTop: 0,
    marginLeft: 8,
    marginRight: 8,
    height: 1.5,
    backgroundColor: "lightgray",
  },
});

export default HorizontalRule;
