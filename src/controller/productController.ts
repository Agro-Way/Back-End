import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../index.js'
import { productSchema } from '../schema/productSchema.js'
import { InternalServerError } from '../exceptions/internal-server-error.js'
import { ErrorCode } from '../exceptions/root.js'
import { BadRequestException } from '../exceptions/bad-request.js'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, description, quantity, imagekey } =
    req.body

    const userId = String(req.params.id)
    const categoryId = String(req.params.id)
  productSchema.parse(req.body)

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  })

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  })

  if (!existingUser) {
    return next(new BadRequestException(
      'Usuário não encontrado', ErrorCode.BAD_REQUEST))
  }

  if( !category) {
    return next(new BadRequestException('Categoria não encontrada', ErrorCode.BAD_REQUEST))
  }

  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      quantity,
      imagekey,
      userId: userId,
      categoryId: categoryId
    },
  })
  res.status(201).json(product)
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    res.status(500).json({ error: 'Erro ao criar produto' })
    
  }
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
