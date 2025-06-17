import type { Response, Request, NextFunction } from 'express'
import type { HttpException } from '../exceptions/root.js'

export const ErrorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.errors,
  })
}
