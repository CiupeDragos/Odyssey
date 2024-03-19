export abstract class HttpResponse<T> {
  static isSuccess<T>(response: HttpResponse<T>): response is HttpSuccess<T> {
    return response instanceof HttpSuccess;
  }

  static isError<T>(response: HttpResponse<T>): response is HttpError<T> {
    return !HttpResponse.isSuccess(response);
  }
}

export class HttpSuccess<T> extends HttpResponse<T> {
  constructor(public data: T) {
    super();
  }
}

export class HttpError<T> extends HttpResponse<T> {
  constructor(public error: string) {
    super();
  }
}
