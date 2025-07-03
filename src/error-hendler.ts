import type { Request, Response, NextFunction } from 'express'
import { ErrorCode, HttpException } from './exceptions/root.js'
import { InternalServerError } from './exceptions/internal-server-error.js'
import { ZodError } from 'zod'
import { BadRequestException } from './exceptions/bad-request.js'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next)
    } catch (error) {
      let exception: HttpException
      if (error instanceof HttpException) {
        exception = error
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestException(
            'A entidade não pode ser processada',
            ErrorCode.UNPROCESSABLE_ENTITY
          )
        }
        console.error(error)
        exception = new InternalServerError(
          'Alguma coisa deu errado no servidor',
          ErrorCode.INTERNAL_SERVER_ERROR
        )
      }
      next(exception)
    }
  }
}
