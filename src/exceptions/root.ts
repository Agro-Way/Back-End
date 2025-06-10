export class HttpException extends Error {
  statusCode: number
  errors: ErrorCode
  message: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  errorCode: any

  constructor(
    statusCode: number,
    error: ErrorCode,
    message: string,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    errorCode: any
  ) {
    super(message)
    this.statusCode = statusCode
    this.errors = error
    this.message = message
    this.errorCode = errorCode
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  UNPROCESSANLE_ENTITY = 'UNPROCESSABLE_ENTITY',
}
