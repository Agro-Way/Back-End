import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets.js'
import { prisma } from '../utils/prisma.js'
import { UnauthorizedException } from '../exceptions/unauthorized.js'
import { ErrorCode } from '../exceptions/root.js'
import { UserNotFoundException } from '../exceptions/not-found.js'

interface JwtPayload {
  userId: string
  // add other properties if needed
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies?.token || // <-- pega o token do cookie
    req.headers.authorization?.split(' ')[1] ||
    (req.query.token as string)
  if (!token) {
    next(
      new UnauthorizedException(
        'Token de acesso não fornecido',
        ErrorCode.UNAUTHORIZED
      )
    )
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload
    const user = await prisma.user.findFirst({
      where: { id: payload.userId },
    })
    if (!user) {
      return next(
        new UserNotFoundException(
          'Usuário não encontrado',
          ErrorCode.USER_NOT_FOUND
        )
      )
    }
    req.user = user
    next()
  } catch (error) {
    return next(
      new UnauthorizedException(
        'Token de acesso inválido',
        ErrorCode.UNAUTHORIZED
      )
    )
  }
}
