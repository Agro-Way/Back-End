import { hashSync } from 'bcrypt'
import { prisma } from '../../utils/prisma.js'
import { SignupSchema } from '../../schema/user.js'
import { ErrorCode } from '../../exceptions/root.js'
import type { NextFunction, Request, Response } from 'express'
import { BadRequestException } from '../../exceptions/bad-request.js'
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignupSchema.parse(req.body)
  const { name, email, telefone, password, confirmPassword, status, role } =
    req.body
  const existingUser = await prisma.user.findFirst({ where: { email } })
  if (existingUser) {
    next(
      new BadRequestException(
        'Usuário já existe',
        ErrorCode.USER_ALREADY_EXISTS
      )
    )
  }

  if (password !== confirmPassword) {
    next(
      new BadRequestException('As senhas não são iguais', ErrorCode.BAD_REQUEST)
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      telefone,
      password: hashSync(password, 12),
      confirmPassword: hashSync(confirmPassword, 12),
      status,
      role,
    },
  })

  res.status(201).json(user)
}
