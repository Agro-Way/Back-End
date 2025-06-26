import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../index.js'
import { productSchema } from '../schema/productSchema.js'
import { InternalServerError } from '../exceptions/internal-server-error.js'
import { ErrorCode } from '../exceptions/root.js'

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, quantity, imagekey, userId, categoryId } =
    req.body
  productSchema.parse(req.body)
  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      quantity,
      imagekey,
      userId,
      categoryId,
    },
  })
  res.status(201).json(product)
}

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10

    const products = await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_At: 'desc',
      },
    })

    res.status(200).json(products)
  } catch (error) {
    console.log(error)
    next(
      new InternalServerError(
        'Erro ao buscar produtos',
        ErrorCode.INTERNAL_SERVER_ERROR
      )
    )
  }
}
