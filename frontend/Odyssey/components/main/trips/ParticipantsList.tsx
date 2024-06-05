import { FlatList, StyleSheet, Text, View } from "react-native";
import { TripParticipant } from "../../../types/response-types";
import ParticipantConfigurator from "./ParticipantConfigurator";
import ParticipantComponent from "./ParticipantComponent";

type ParticipantsListProps = {
  participants: Array<TripParticipant>;
  updateParticipants?: (participants: Array<TripParticipant>) => void;
  viewOnly?: true;
};

function ParticipantsList({
  participants,
  updateParticipants,
  viewOnly,
}: ParticipantsListProps) {
  function handleParticipantUpdate(
    participant: TripParticipant,
    index: number
  ) {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = participant;

    updateParticipants!!(updatedParticipants);
  }

  function getParticipantComponent(item: TripParticipant, index: number) {
    if (viewOnly) {
      return <ParticipantComponent participant={item} />;
    } else {
      return (
        <ParticipantConfigurator
          participant={item}
          onUpdateParticipant={(participant) =>
            handleParticipantUpdate(participant, index)
          }
        />
      );
    }
  }

  return (
    <FlatList
      style={styles.list}
      data={participants}
      renderItem={({ item, index }) => getParticipantComponent(item, index)}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 24,
    backgroundColor: "white",
    width: "95%",
    paddingHorizontal: 6,
  },
});

export default ParticipantsList;
