import { StyleSheet, Text, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Colors } from "../../util/constants";
import { useState } from "react";

type BirthdayInputProps = {
  errorText?: string;
  onDateChange: (stringTimestamp: string) => void;
};

function BirthInput({ errorText, onDateChange }: BirthdayInputProps) {
  const [curDate, setCurDate] = useState(new Date());

  function handleDateChange(
    datePickEvent: DateTimePickerEvent,
    stringTimestamp: string
  ) {
    if (datePickEvent.type === "dismissed") return;
    onDateChange(stringTimestamp);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Enter your birthdate:</Text>
        <DateTimePicker
          value={curDate}
          onChange={(event, date) =>
            handleDateChange(event, date!.getTime().toString())
          }
        />
      </View>
      {errorText && <Text style={styles.errText}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
  },
  errText: {
    color: Colors.errorText,
    fontSize: 15,
    marginTop: 2,
  },
});

export default BirthInput;
