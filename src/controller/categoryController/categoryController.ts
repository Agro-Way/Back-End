import type { Request, Response, NextFunction } from 'express'
import { ErrorCode } from '../../exceptions/root.js'
import { prisma } from '../../utils/prisma.js'
import { categorySchema } from '../../schema/categorySchema.js'
import { InternalServerError } from '../../exceptions/internal-server-error.js'

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    categorySchema.parse(req.body)
    const { name, description } = req.body

    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    })

    res.status(201).json(category)
  } catch (error) {
    console.log('Error creating category:', error)
    next(
      new InternalServerError(
        'Problemas no servidor',
        ErrorCode.INTERNAL_SERVER_ERROR
      )
    )
  }
}

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.category.findMany()

    res.status(200).json(categories)
  } catch (error) {
    console.log('Error fetching categories:', error)
    next(
      new InternalServerError(
        'Problemas no servidor',
        ErrorCode.INTERNAL_SERVER_ERROR
      )
    )
  }
}
