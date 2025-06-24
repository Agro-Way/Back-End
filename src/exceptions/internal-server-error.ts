import { ErrorCode, HttpException } from "./root.js";

export class InternalServerError extends HttpException {
  constructor(message: string, errors: ErrorCode) {
    super(500, ErrorCode.INTERNAL_SERVER_ERROR, message, errors);
  }
}
