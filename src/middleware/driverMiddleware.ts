import type { Request, Response, NextFunction } from 'express'

export const driverMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user

  if (user?.role === 'CONDUTOR') {
    next()
  } else {
    res.status(403).json({})
  }
}
