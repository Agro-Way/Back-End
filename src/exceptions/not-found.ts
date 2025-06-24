import { ErrorCode, HttpException } from './root.js'
export class UserNotFoundException extends HttpException {
  constructor(message: string, errors: ErrorCode) {
    super(404, ErrorCode.USER_NOT_FOUND, message, errors);
  }
}
