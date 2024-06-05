import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  LogBox,
  Alert,
} from "react-native";
import { MainStackNavProp } from "../../../types/navigation";
import { AddTripRequest } from "../../../types/request-types";
import { useContext, useState } from "react";
import Input from "../../../components/common/Input";
import { Colors } from "../../../util/constants";
import BirthDateInput from "../../../components/auth/BirthDateInput";
import VisitedCountries from "../../../components/main/profile/VisitedCountries";
import { TripParticipant } from "../../../types/response-types";
import CustomButton from "../../../components/common/CustomButton";
import {
  validateTripCountries,
  validateTripDescription,
  validateTripEndDate,
  validateTripParticipants,
  validateTripStartDate,
  validateTripTitle,
} from "../../../util/credentialsValidation";
import { Gender } from "../../../util/enums";
import ParticipantsList from "../../../components/main/trips/ParticipantsList";
import KeyboardAvoidingContainer from "../../../components/common/KeyboardAvoidingContainer";
import { MainContext } from "../../../store/MainContext";
import { addTrip } from "../../../http/trips";
import { HttpResponse } from "../../../http/HttpResponse";
import LoadingOverlay from "../../../components/common/LoadingOverlay";

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

const defaultState: Omit<AddTripRequest, "participants"> = {
  organizerId: "",
  organizerUsername: "",
  title: "",
  description: "",
  visitedCountries: [],
  startTimestamp: new Date().getTime(),
  endTimestamp: new Date().getTime(),
};

const defaultErrorState = {
  title: "",
  description: "",
  participants: "",
  visitedCountries: "",
  startTimestamp: "",
  endTimestamp: "",
};

function AddTripScreen() {
  const mainContext = useContext(MainContext);
  const navigation = useNavigation<MainStackNavProp>();
  const [inputFields, setInputFields] = useState(defaultState);
  const [errorFields, setErrorFields] = useState(defaultErrorState);
  const [participants, setParticipants] = useState<Array<TripParticipant>>([]);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(
    field: string,
    value: string | number | Array<string> | Array<TripParticipant>
  ) {
    setInputFields((curFields) => ({ ...curFields, [field]: value }));
  }

  function handleParticipantsCountChange(stringCount: string) {
    const regex = /^-?(0|[1-9]\d*)$/; // checking if string is valid int

    if (!regex.test(stringCount)) {
      console.log("Invalid participant count");
      return;
    }
    const count = parseInt(stringCount);
    const difference = count - participantsCount;

    let updatedParticipants = [...participants];
    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        const participantToAdd: TripParticipant = {
          age: 0,
          requiredGender: Gender.ANY,
          gender: Gender.MAN,
          index: participants.length + i,
          maxAge: 0,
          minAge: 0,
          participantId: "",
          participantUsername: "",
        };
        updatedParticipants.push(participantToAdd);
      }
    } else if (difference < 0) {
      console.log(difference, Math.abs(difference));
      updatedParticipants.splice(difference, Math.abs(difference));
    }

    setParticipantsCount(count);
    updateParticipants(updatedParticipants);
  }

  function validateData() {
    const titleError = validateTripTitle(inputFields.title);
    const descriptionError = validateTripDescription(inputFields.description);
    const startDateError = validateTripStartDate(inputFields.startTimestamp);
    const endDateError = validateTripEndDate(
      inputFields.startTimestamp,
      inputFields.endTimestamp
    );
    const visitedCountriesError = validateTripCountries(
      inputFields.visitedCountries
    );
    const participantsError = validateTripParticipants(participantsCount);

    const updatedErrors = {
      title: titleError,
      description: descriptionError,
      participants: participantsError,
      visitedCountries: visitedCountriesError,
      startTimestamp: startDateError,
      endTimestamp: endDateError,
    };

    setErrorFields(updatedErrors);

    if (
      titleError.length !== 0 ||
      descriptionError.length !== 0 ||
      startDateError.length !== 0 ||
      endDateError.length !== 0 ||
      visitedCountriesError.length !== 0 ||
      participantsError.length !== 0
    ) {
      return false;
    }

    return true;
  }

  function updateParticipants(participants: Array<TripParticipant>) {
    setParticipants(participants);
  }

  async function handleAddTrip() {
    if (!validateData()) {
      return;
    }

    setIsLoading(true);
    const addTripRequest: AddTripRequest = {
      organizerId: mainContext.userData!!.id,
      organizerUsername: mainContext.userData!!.username,
      title: inputFields.title,
      description: inputFields.description,
      startTimestamp: inputFields.startTimestamp,
      endTimestamp: inputFields.endTimestamp,
      visitedCountries: inputFields.visitedCountries,
      participants: participants,
    };

    const response = await addTrip(addTripRequest);

    if (HttpResponse.isSuccess(response)) {
      navigation.navigate("MainTabs", {
        screen: "Trips",
        params: { refetchKey: new Date().getTime() },
      });
    } else if (HttpResponse.isError(response)) {
      setIsLoading(false);
      Alert.alert("An error occurred", response.error);
    }
  }

  console.log(participants);

  return (
    <KeyboardAvoidingContainer customStyle={styles.scrollContainer}>
      <View style={styles.inputsArea}>
        <Input
          label="Title"
          onChangeText={(text) => handleInputChange("title", text)}
          inputMode="text"
          flat
          borderColor={Colors.primary}
          borderWidth={1}
          borderRadius={30}
          errorText={errorFields.title}
          value={inputFields.title}
        />
        <Input
          label="Description"
          onChangeText={(text) => handleInputChange("description", text)}
          inputMode="text"
          flat
          borderColor={Colors.primary}
          height={100}
          multiline
          borderWidth={1}
          borderRadius={30}
          errorText={errorFields.description}
          value={inputFields.description}
        />
        <View style={{ marginBottom: 12 }}>
          <View style={styles.participantsView}>
            <Text style={styles.participantsLabel}>Participants count:</Text>
            <TextInput
              style={styles.participantCountInput}
              inputMode="decimal"
              onChangeText={(text) => handleParticipantsCountChange(text)}
            />
          </View>
          {errorFields.participants.length > 0 && (
            <Text style={styles.participantsError}>
              {errorFields.participants}
            </Text>
          )}
        </View>

        <BirthDateInput
          errorText={errorFields.startTimestamp}
          label="Start date:"
          labelMarginRight={4}
          onDateChange={(stringTimestamp) =>
            handleInputChange("startTimestamp", parseInt(stringTimestamp))
          }
        />
        <BirthDateInput
          errorText={errorFields.endTimestamp}
          label="End date:"
          labelMarginRight={2}
          onDateChange={(stringTimestamp) =>
            handleInputChange("endTimestamp", parseInt(stringTimestamp))
          }
        />
        <VisitedCountries
          visitedCountries={inputFields.visitedCountries}
          editMode
          errorText={errorFields.visitedCountries}
          onUpdate={(countries) =>
            handleInputChange("visitedCountries", countries)
          }
        />
      </View>
      <View style={styles.listArea}>
        {participants.length !== 0 && (
          <ParticipantsList
            participants={participants}
            updateParticipants={updateParticipants}
          />
        )}
        <CustomButton
          label="Add trip"
          color={Colors.secondary}
          onTap={handleAddTrip}
          customStyle={styles.addButton}
        />
      </View>
      <LoadingOverlay isVisible={isLoading} label="Adding trip..." />
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 120,
    paddingTop: 24,
  },
  listArea: {
    width: "100%",
    alignItems: "center",
  },
  inputsArea: {
    width: "80%",
  },
  participantsView: {
    flexDirection: "row",
    alignItems: "center",
  },
  participantsError: {
    color: Colors.errorText,
    fontSize: 15,
    marginTop: 2,
  },
  participantsLabel: {
    fontSize: 18,
  },
  participantCountInput: {
    width: 30,
    marginLeft: 8,
    padding: 2,
    borderBottomWidth: 1,
    fontSize: 18,
  },
  addButton: {
    marginTop: 24,
    width: "90%",
  },
});

export default AddTripScreen;
