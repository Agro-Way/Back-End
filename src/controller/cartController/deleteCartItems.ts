import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../../utils/prisma.js'

export const deleteCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await prisma.cartItem.delete({
    where: {
      id: req.params.id,
    },
  })

  res.json({ success: true })
}
