import type { Request, Response } from 'express'
import { prisma } from '../../utils/prisma.js'

export const changeCartItemsQuantity = async (req: Request, res: Response) => {
  const { quantity } = req.body
  const updatedCart = await prisma.cartItem.update({
    where: { id: req.params.id },
    data: {
      quantity,
    },
  })
  res.json({ updatedCart })
}
