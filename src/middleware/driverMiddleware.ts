import type { Request, Response, NextFunction } from 'express'
import { UnauthorizedException } from '../exceptions/unauthorized.js'
import { ErrorCode } from '../exceptions/root.js'

export const driverMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user

  if (user?.role === 'CONDUTOR') {
    next()
  } else {
    next(
      new UnauthorizedException(
        'Acesso negado. Somente condutores podem acessar este recurso.',
        ErrorCode.UNAUTHORIZED
      )
    )
  }
}
