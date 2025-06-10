import jwt from 'jsonwebtoken'
import { prisma } from '../index.js'
import { JWT_SECRET } from '../secrets.js'
import { compareSync, hashSync } from 'bcrypt'
import type { Request, Response } from 'express'
import { SignupSchema } from '../schema/user.js'

export const signup = async (req: Request, res: Response) => {
  SignupSchema.parse(req.body)
  const { name, email, password, role } = req.body

  let user = await prisma.user.findFirst({ where: { email } })
  if (user) {
    throw Error('Usuário já cadastrado')
  }

  user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 12),
      role,
    },
  })
  res.json(user)
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
