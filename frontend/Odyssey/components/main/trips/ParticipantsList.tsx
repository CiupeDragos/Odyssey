import { FlatList, StyleSheet, Text, View } from "react-native";
import { TripParticipant } from "../../../types/response-types";
import ParticipantConfigurator from "./ParticipantConfigurator";

type ParticipantsListProps = {
  participants: Array<TripParticipant>;
  updateParticipants: (participants: Array<TripParticipant>) => void;
};

function ParticipantsList({
  participants,
  updateParticipants,
}: ParticipantsListProps) {
  function handleParticipantUpdate(
    participant: TripParticipant,
    index: number
  ) {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = participant;

    updateParticipants(updatedParticipants);
  }

  return (
    <FlatList
      style={styles.list}
      data={participants}
      renderItem={({ item, index }) => (
        <ParticipantConfigurator
          participant={item}
          onUpdateParticipant={(participant) =>
            handleParticipantUpdate(participant, index)
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 36,
    backgroundColor: "white",
    width: "95%",
    paddingHorizontal: 6,
  },
});

export default ParticipantsList;
