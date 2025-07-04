import type { Response, Request, NextFunction } from 'express'
import { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { BadRequestException } from '../../exceptions/bad-request.js'
import { UserNotFoundException } from '../../exceptions/not-found.js'
import { ErrorCode } from '../../exceptions/root.js'
import { loginSchema } from '../../schema/auth.js'
import { JWT_SECRET } from '../../secrets.js'
import { prisma } from '../../utils/prisma.js'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const login = loginSchema.parse(req.body)
  const { email, password } = login

  const user = await prisma.user.findFirst({ where: { email } })
  if (!user) {
    throw next(
      new UserNotFoundException(
        'Usuário não encontrado',
        ErrorCode.USER_NOT_FOUND
      )
    )
  }
  if (!compareSync(password, user.password)) {
    next(new BadRequestException('Password incorreta', ErrorCode.BAD_REQUEST))
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET)

  res.json({ token, user })
}

/*
'token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // deve comparar com 'production', não 'true'
    sameSite: 'strict', // você escreveu 'stritc' (erro de digitação)
    maxAge: 3600000, // 1 hora
  }
*/
