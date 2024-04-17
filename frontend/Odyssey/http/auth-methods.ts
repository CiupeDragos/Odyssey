import { LoginRequest, RegisterRequest } from "./request-types";
import { HttpResponse } from "./HttpResponse";
import { UserData } from "./response-types";
import { RegisterFields } from "../components/auth/RegisterForm";
import { normalizeSpaces } from "../util/credentialsValidation";
import { genericPostMethod } from "./base-methods";

export async function registerAccount({
  username,
  realName,
  birthTimestamp,
  country,
  password,
}: RegisterFields): Promise<HttpResponse<string>> {
  const registerRequest: RegisterRequest = {
    username: username,
    realName: normalizeSpaces(realName),
    birthTimestamp: parseInt(birthTimestamp),
    country: country,
    password: password,
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
