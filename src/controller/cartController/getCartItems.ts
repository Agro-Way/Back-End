import type { Request, Response } from 'express'
import { prisma } from '../../utils/prisma.js'

export const getCartItems = async (req: Request, res: Response) => {
  const cart = await prisma.cartItem.findMany({
    where: { userId: req.params.userId },
    include: {
      product: true,
    },
  })
  res.json({ cart })
}
