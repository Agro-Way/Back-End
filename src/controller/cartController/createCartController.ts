import type { Request, Response, NextFunction } from 'express'
import { BadRequestException } from '../../exceptions/bad-request.js'
import { ErrorCode } from '../../exceptions/root.js'
import { prisma } from '../../utils/prisma.js'

export const createCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, productId, quantity } = req.body

    const existingProduct = await prisma.product.findFirst({
      where: { id: productId },
    })

    if (!existingProduct) {
      next(
        new BadRequestException('Produto não encontrado', ErrorCode.BAD_REQUEST)
      )
    }

    const newCart = await prisma.cartItem.create({
      data: {
        user: {
          connect: { id: userId },
        },
        product: {
          connect: { id: productId },
        },
        quantity,
      },
    })
    res.status(201).json({ newCart })
  } catch (error) {
    console.error(error)
    next(
      new BadRequestException(
        'Problemas ao criar o carrino',
        ErrorCode.BAD_REQUEST
      )
    )
  }
}
