import { ErrorCode, HttpException } from './root.js'

export class UnauthorizedException extends HttpException {
  constructor(message: string, errors: ErrorCode) {
    super(401, ErrorCode.UNAUTHORIZED, message, errors);
  }
}