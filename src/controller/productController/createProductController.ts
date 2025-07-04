import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../../utils/prisma.js'
import { productSchema } from '../../schema/productSchema.js'
import { InternalServerError } from '../../exceptions/internal-server-error.js'
import { ErrorCode } from '../../exceptions/root.js'
import { BadRequestException } from '../../exceptions/bad-request.js'
import { Role } from '../../../generated/prisma/index.js'

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, description, quantity, producerId, categoryId } =
      req.body

    const producer = await prisma.user.findUnique({
      where: { id: producerId },
    })

    if (!producer || producer.role !== Role.PRODUTOR) {
      return next(
        new BadRequestException(
          'Usuário não é um produtor válido',
          ErrorCode.BAD_REQUEST
        )
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number.parseFloat(price),
        description,
        imageUrl: '', // Provide a default or actual image URL
        imagekey: '', // Provide a default or actual image key
        quantity, // Add quantity directly as required by ProductCreateInput
        producer: {
          connect: { id: producerId },
        },
        category: {
          connect: { id: categoryId },
        },
      },
    })
    res.status(201).json(product)
  } catch (error) {
    console.log('Erro ao criar produto:', error)
    next(
      new InternalServerError(
        'Erro ao criar produto',
        ErrorCode.INTERNAL_SERVER_ERROR
      )
    )
  }
}
