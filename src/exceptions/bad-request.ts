import { ErrorCode, HttpException } from './root.js'
export class BadRequestException extends HttpException {
  constructor(message: string, errors: ErrorCode) {
    super(400, ErrorCode.BAD_REQUEST, message, errors);
  }
}
