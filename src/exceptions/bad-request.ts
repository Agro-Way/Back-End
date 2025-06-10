import { type ErrorCode, HttpException } from './root.js'

export class BadRequestException extends HttpException {
  constructor(error: ErrorCode, message: string, errorCode: ErrorCode) {
    super(400, error, message, errorCode)
  }
}
