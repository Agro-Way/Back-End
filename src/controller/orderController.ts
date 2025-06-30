import { prisma } from '../utils/prisma.js'
import type { Request, Response, NextFunction } from 'express'

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    productId,
    quantity,
    totalPrice,
    status,
    deliverAt,
    deliveryAddress,
  } = req.body

  try {
    const createdOrder = await prisma.order.create({
      data: {
        user: {
          connect: { id: userId },
        },
        product: {
          connect: { id: productId },
        },
        quantity,
        totalPrice,
        status,
        // deliverAt
        // deliveryAddress
      },
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return next(new Error('Failed to create order'))
  }
}
