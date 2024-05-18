import { ActivityIndicator, Modal, StyleSheet, View, Text } from "react-native";

type LoadingOverlayProps = {
  label: string;
  isVisible: boolean;
};

function LoadingOverlay({ label, isVisible }: LoadingOverlayProps) {
  return (
    <Modal visible={isVisible} animationType="none" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <ActivityIndicator color="white" />
          <Text style={styles.label}>{label}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {},
  label: {
    fontSize: 20,
    color: "white",
  },
});

export default LoadingOverlay;
