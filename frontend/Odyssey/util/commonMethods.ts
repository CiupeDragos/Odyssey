import * as FileSystem from "expo-file-system";
import { AddressComponent } from "../screens/main/home/PickLocationScreen";
import { TextLocation } from "../types/response-types";

export function getYearsFromTimestamp(timestamp: string | number): number {
  const intTimestamp =
    typeof timestamp === "string" ? parseInt(timestamp) : timestamp;

  const currentTimestamp = new Date().getTime();
  const differenceMs = currentTimestamp - intTimestamp;

  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const age = differenceMs / millisecondsPerYear;

  return Math.floor(age);
}

export async function getBase64FromUri(photoUri: string) {
  try {
    const base64Img = await FileSystem.readAsStringAsync(photoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return base64Img;
  } catch {
    console.log("Reading the profile image file failed");
    return null;
  }
}

export function getTextLocationFromAddressArray(
  addressComponents: Array<AddressComponent>
): TextLocation {
  const country = addressComponents.find((address) =>
    address.types.includes("country")
  )?.long_name;
  const area = addressComponents.find((address) =>
    address.types.includes("locality")
  )?.long_name;

  return {
    area: area ?? "",
    country: country ?? "",
  };
}
