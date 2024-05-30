import { LoginRequest, RegisterRequest } from "../types/request-types";
import { HttpResponse } from "./HttpResponse";
import { UserData } from "../types/response-types";
import { RegisterFields } from "../components/auth/RegisterForm";
import { normalizeSpaces } from "../util/credentialsValidation";
import { genericPostMethod } from "./base-methods";

export async function registerAccount({
  username,
  realName,
  birthTimestamp,
  country,
  password,
  gender,
}: RegisterFields): Promise<HttpResponse<string>> {
  const chosenGender = gender!!;

  const registerRequest: RegisterRequest = {
    username: username,
    realName: normalizeSpaces(realName),
    birthTimestamp: parseInt(birthTimestamp),
    country: country,
    password: password,
    gender: chosenGender,
  };

  return genericPostMethod(registerRequest, "register");
}

export async function loginAccount(
  username: string,
  password: string
): Promise<HttpResponse<UserData>> {
  const loginReqest: LoginRequest = {
    username: username,
    password: password,
  };

  return genericPostMethod(loginReqest, "login");
}
