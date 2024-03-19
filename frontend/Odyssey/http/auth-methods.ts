import axios from "axios";
import { RegisterRequest } from "./request-types";
import { BASE_URL } from "../util/constants";
import { HttpError, HttpResponse, HttpSuccess } from "./HttpResponse";

export async function registerAccount(
  username: string,
  password: string
): Promise<HttpResponse<string>> {
  const registerRequest: RegisterRequest = {
    username: username,
    password: password,
  };

  try {
    const response = await axios.post(`${BASE_URL}/register`, registerRequest);

    return new HttpSuccess<string>(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return new HttpError(error.response?.data ?? "An unknown error occurred");
    }

    return new HttpError("An unknown error occurred");
  }
}
