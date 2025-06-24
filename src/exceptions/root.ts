export class HttpException extends Error {
  statusCode: number
  errors: ErrorCode
  message: string
  errorCode: number

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
  USER_ALREADY_EXISTS = 409,
  INVALID_CREDENTIALS = 401,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
}
