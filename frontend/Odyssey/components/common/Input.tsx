import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../util/constants";

type InputProps = {
  label: string;
  errorText?: string;
  onChangeText: (text: string) => void;
  borderColor?: string;
  borderWidth?: number;
  customStyle?: ViewStyle;
  height?: number;
} & TextInputProps;

function Input({
  label,
  borderColor,
  borderWidth,
  customStyle,
  errorText,
  onChangeText,
  height,
  ...inputProps
}: InputProps) {
  const inputHeight = height ?? 35;
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={{
          borderColor: borderColor,
          borderWidth: !borderWidth ? 1 : borderWidth,
          backgroundColor:
            errorText && errorText.length > 0 ? Colors.inputError : undefined,
        }}
      >
        <TextInput
          style={[styles.input, { height: inputHeight }]}
          onChangeText={onChangeText}
          {...inputProps}
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
  input: {
    padding: 4,
    paddingLeft: 8,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
  },
  errText: {
    color: Colors.errorText,
    fontSize: 15,
    marginTop: 2,
  },
});

export default Input;
