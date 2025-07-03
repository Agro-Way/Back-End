import { prisma } from '../../utils/prisma.js'
import { ErrorCode } from '../../exceptions/root.js'
import type { Request, Response, NextFunction } from 'express'
import { BadRequestException } from '../../exceptions/bad-request.js'

export const estoqueController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quantity, productId } = req.body
    // const productId = Number(req.params.producerId)
    const estoque = await prisma.stock.findUnique({
      where: { id: productId },
    })

    if (!estoque || estoque.quantity < quantity) {
      next(
        new BadRequestException(
          'Estoque insuficiente ou produto não encontrado',
          ErrorCode.BAD_REQUEST
        )
      )
    }

    const newStock = await prisma.stock.update({
      where: {
        id: productId,
      },
      data: {
        quantity: (estoque?.quantity ?? 0) - quantity,
      },
    })
  } catch (error) {
    console.log(error)
    next(
      new BadRequestException(
        'Erro ao realizar a compra',
        ErrorCode.BAD_REQUEST
      )
    )
  }
}
