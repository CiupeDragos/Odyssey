import axios from "axios";
import { LoginRequest, RegisterRequest } from "./request-types";
import { BASE_URL } from "../util/constants";
import { HttpError, HttpResponse, HttpSuccess } from "./HttpResponse";

export async function genericPostMethod<T, K>(
  requestBody: T,
  endpoint: string
): Promise<HttpResponse<K>> {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, requestBody);

    return new HttpSuccess<K>(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return new HttpError<K>(
        error.response?.data ?? "An unknown error occurred"
      );
    }

    return new HttpError<K>("An unknown error occurred");
  }
}

export async function registerAccount(
  username: string,
  password: string
): Promise<HttpResponse<string>> {
  const registerRequest: RegisterRequest = {
    username: username,
    password: password,
  };

  return genericPostMethod(registerRequest, "register");
}

export async function loginAccount(
  username: string,
  password: string
): Promise<HttpResponse<string>> {
  const loginReqest: LoginRequest = {
    username: username,
    password: password,
  };

  return genericPostMethod(loginReqest, "login");
}
