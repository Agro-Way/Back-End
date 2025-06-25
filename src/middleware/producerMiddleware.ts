import type { Request, Response, NextFunction } from 'express'
import { UnauthorizedException } from '../exceptions/unauthorized.js'
import { ErrorCode } from '../exceptions/root.js'

export const producerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user
  if (user?.role === 'PRODUTOR') {
    next()
  } else {
    next(
      new UnauthorizedException(
        'Acesso negado. Somente produtores podem acessar este recurso.',
        ErrorCode.UNAUTHORIZED
      )
    )
  }
}
