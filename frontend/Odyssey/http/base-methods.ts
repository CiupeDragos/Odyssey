import axios from "axios";
import { HttpError, HttpResponse, HttpSuccess } from "./HttpResponse";
import { BASE_URL } from "../util/constants";

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

export async function genericGetMethod<T, K>(
  endpoint?: string,
  queryParams?: T,
  fullUrl?: string
): Promise<HttpResponse<K>> {
  try {
    const url = fullUrl ?? `${BASE_URL}/${endpoint}`;
    const response = await axios.get(url, {
      params: queryParams,
    });

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
