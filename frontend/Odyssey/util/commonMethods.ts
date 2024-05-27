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

export function getDateFromFromTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
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

export function getRatingStars(rating: string): [number, number, boolean] {
  const splitRating = rating.split(".");
  const fullStarsCount = parseInt(splitRating[0]);
  const hasHalfStar = splitRating.length === 1 ? false : true; // If the rating split returns 1 element, then it doesn't have a .5 at the end
  const emptyStarsCount = 5 - fullStarsCount - (hasHalfStar ? 1 : 0);

  return [fullStarsCount, emptyStarsCount, hasHalfStar];
}

function transformTime(time: number) {
  return Math.floor(time);
}

export function getCommentTimestampText(timestamp: number) {
  const curDate = new Date();
  const commentDate = new Date(timestamp);
  const timestampDifference = curDate.getTime() - timestamp;

  const minutes = transformTime(timestampDifference / (1000 * 60));
  if (minutes === 0) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = transformTime(timestampDifference / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = transformTime(timestampDifference / (1000 * 60 * 60 * 24));
  if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  const isSameYear = curDate.getFullYear() === commentDate.getFullYear();
  if (isSameYear) {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return commentDate.toLocaleDateString("en-US", options);
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return commentDate.toLocaleDateString("en-US", options);
}

export function getTimeDurationTextFromSeconds(seconds: number) {
  const minutes = transformTime(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minutes by car`;
  }

  const hours = transformTime(seconds / 3600);
  const minutesLeft = transformTime((seconds - hours * 3600) / 60);

  return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutesLeft} ${
    minutesLeft === 1 ? "minute" : "minutes"
  } by car`;
}
