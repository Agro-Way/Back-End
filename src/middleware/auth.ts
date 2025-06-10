import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets.js'
import { prisma } from '../index.js'

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' })
  }
  try {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const payload = jwt.verify(token, JWT_SECRET) as any
    const user = await prisma.user.findFirst({
      where: { id: payload.userId },
    })
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid access token' })
  }
}
