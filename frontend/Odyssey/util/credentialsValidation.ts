import { TripParticipant } from "../types/response-types";
import { getYearsFromTimestamp } from "./commonMethods";
import {
  MAX_PASSWORD_LENGTH,
  MAX_TITLE_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_TITLE_LENGTH,
  MIN_USERNAME_LENGTH,
} from "./constants";
import { Gender } from "./enums";

export function validateUsername(username: string): string {
  if (username.length < MIN_USERNAME_LENGTH) {
    return `Username must have at least ${MIN_USERNAME_LENGTH} characters!`;
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    return `Username must have at most ${MAX_USERNAME_LENGTH} characters!`;
  }

  return "";
}

export function validateRealName(realName: string): string {
  realName = trimEnd(realName);
  if (realName.length == 0) {
    return "You need to enter your real name!";
  }

  if (realName.split(" ").length < 2) {
    return "Both first name and last name are necessary!";
  }

  return "";
}

export function validateBirthdayTimestamp(birthdayTimestamp: string): string {
  const age = getYearsFromTimestamp(birthdayTimestamp);

  if (age < 14) {
    return "You need to be at least 14 years old!";
  }

  return "";
}

export function validateCountry(country: string): string {
  if (country.length == 0) {
    return "You need to specify your country!";
  }

  return "";
}

export function validatePassword(password: string): string {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must have at least ${MIN_PASSWORD_LENGTH} characters!`;
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    return `Password must have at most ${MAX_PASSWORD_LENGTH} characters!`;
  }

  return "";
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string {
  if (password != confirmPassword) {
    return "Passwords do not match";
  }

  return "";
}

export function validateLocationTitle(title: string) {
  if (title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH) {
    return `The title needs to be between ${MIN_TITLE_LENGTH} and ${MAX_TITLE_LENGTH} characters`;
  }

  return "";
}

export function validateGender(gender?: Gender) {
  if (!gender) {
    return "You need to select a gender";
  }

  return "";
}

export function validateTripTitle(title: string) {
  if (title.length === 0) {
    return "The title can't be empty";
  }

  return "";
}

export function validateTripDescription(desc: string) {
  if (desc.length === 0) {
    return "The description can't be empty";
  }

  return "";
}

export function validateTripStartDate(timestamp: number) {
  if (timestamp + 1000 * 60 * 5 < new Date().getTime()) {
    return "Start can't be in the past";
  }

  return "";
}

export function validateTripEndDate(
  startTimestamp: number,
  endTimestamp: number
) {
  if (endTimestamp + 1000 * 60 * 5 < new Date().getTime()) {
    return "End can't be in the past";
  }

  if (endTimestamp < startTimestamp) {
    return "The end can't be before the start";
  }

  return "";
}

export function validateTripCountries(countries: Array<string>) {
  if (countries.length === 0) {
    return "You need to add at least one country";
  }

  return "";
}

export function validateTripParticipants(participantsCount: number) {
  if (participantsCount === 0) {
    return "You need to add at least one participant";
  }

  return "";
}

//Removing all white spaces at the end
export function trimEnd(str: string) {
  return str.replace(/\s+$/, "");
}

//Leaves only 1 space between words
export function normalizeSpaces(str: string) {
  return str.replace(/\s+/g, " ").trim();
}
