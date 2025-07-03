import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../../utils/prisma.js'
import { InternalServerError } from '../../exceptions/internal-server-error.js'
import { ErrorCode } from '../../exceptions/root.js'

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
