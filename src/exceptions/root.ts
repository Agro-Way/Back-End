export class HttpException extends Error {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  statusCode: number
  errors: ErrorCode
  message: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  errorCode: any

  constructor(
    statusCode: number,
    error: ErrorCode,
    message: string,
    errorCode: ErrorCode
  ) {
    super(message)
    this.statusCode = statusCode
    this.errors = error
    this.message = message
    this.errorCode = errorCode
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 404,
  USER_ALREADY_EXISTS = 400,
  INVALID_CREDENTIALS = 400,
  UNPROCESSANLE_ENTITY = 1001,
}
