import jwt from 'jsonwebtoken'
import { compareSync, hashSync } from 'bcrypt'
import { prisma } from '../utils/prisma.js'
import { JWT_SECRET } from '../secrets.js'
import { loginSchema } from '../schema/auth.js'
import { SignupSchema } from '../schema/user.js'
import { ErrorCode } from '../exceptions/root.js'
import type { NextFunction, Request, Response } from 'express'
import { BadRequestException } from '../exceptions/bad-request.js'
import { UserNotFoundException } from '../exceptions/not-found.js'

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

export const login = async (req: Request, res: Response) => {
  const login = loginSchema.parse(req.body)
  const { email, password } = login

  const user = await prisma.user.findFirst({ where: { email } })
  if (!user) {
    throw new UserNotFoundException(
      'Usuário não encontrado',
      ErrorCode.USER_NOT_FOUND
    )
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequestException('Password incorreta', ErrorCode.BAD_REQUEST)
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET)
  res.json({ user, token })
}
