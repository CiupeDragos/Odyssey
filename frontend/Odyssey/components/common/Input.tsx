import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../util/constants";
import { ReactNode } from "react";

type InputProps = {
  label?: string;
  marginBottom?: number;
  errorText?: string;
  flat?: true;
  borderRadius?: number;
  onChangeText: (text: string) => void;
  borderColor?: string;
  borderWidth?: number;
  customStyle?: ViewStyle;
  height?: number;
  icon?: ReactNode;
  inputBackgroundColor?: string;
} & TextInputProps;

function Input({
  label,
  borderColor,
  borderRadius,
  marginBottom,
  borderWidth,
  customStyle,
  errorText,
  onChangeText,
  icon,
  flat,
  inputBackgroundColor,
  height,
  ...inputProps
}: InputProps) {
  const inputHeight = height ?? 35;
  const inputMarginBottom = marginBottom ?? 24;
  const inputBackground = inputBackgroundColor ?? "white";

  return (
    <View
      style={[
        styles.container,
        customStyle,
        { marginBottom: inputMarginBottom },
      ]}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          !flat && styles.elevatedInput,
          {
            borderColor: borderColor,
            borderWidth: borderWidth ?? 0,
            borderRadius: borderRadius ?? 0,
            backgroundColor:
              errorText && errorText.length > 0
                ? Colors.inputError
                : inputBackground,
          },
        ]}
      >
        {icon && <View>{icon}</View>}
        <TextInput
          style={[styles.input, { height: inputHeight }]}
          onChangeText={onChangeText}
          {...inputProps}
        />
      </View>
      {errorText && errorText.length > 0 && (
        <Text style={styles.errText}>{errorText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    padding: 4,
    paddingLeft: 8,
    fontSize: 18,
    flex: 1,
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
  elevatedInput: {
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
  },
});

export default Input;
