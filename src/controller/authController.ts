import jwt from 'jsonwebtoken'
import { prisma } from '../index.js'
import { JWT_SECRET } from '../secrets.js'
import { compareSync, hashSync } from 'bcrypt'
import type { Request, Response } from 'express'
import { SignupSchema } from '../schema/user.js'
import { CreateUser } from '../models/users/services/createUser/createUser.js'

export const signup = async (req: Request, res: Response) => {
  SignupSchema.parse(req.body)
  const {
    name,
    email,
    password,
    confirmPassword,
    status,
    role,
    created_At,
    updated_At,
  } = req.body

  const userCreated = new CreateUser()

  const result = await userCreated.execute({
    name,
    email,
    password,
    confirmPassword,
    status,
    role,
    created_At,
    updated_At,
  })

  res.status(201).json(result)
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await prisma.user.findFirst({ where: { email } })
  if (!user) {
    throw Error('Usuário não encontrado')
  }
  if (!compareSync(password, user.password)) {
    throw Error('Credenciais inválidas')
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET)
  res.json({ user, token })
}
