import type { Request, Response, NextFunction } from 'express'
import { BadRequestException } from '../../exceptions/bad-request.js'
import { ErrorCode } from '../../exceptions/root.js'
import { prisma } from '../../utils/prisma.js'

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body
    const updatedProduct = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: product,
    })
    res.json(updatedProduct)
  } catch (error) {
    console.log(error)
    next(
      new BadRequestException('Produto não encontrado', ErrorCode.BAD_REQUEST)
    )
  }
}
