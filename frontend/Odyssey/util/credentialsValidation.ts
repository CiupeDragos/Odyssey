import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "./constants";

export function validateUsername(username: string): string {
  if (username.length < MIN_USERNAME_LENGTH) {
    return `Username must have at least ${MIN_USERNAME_LENGTH} characters!`;
  }

  if (username.length > MAX_USERNAME_LENGTH) {
    return `Username must have at most ${MAX_USERNAME_LENGTH} characters!`;
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
