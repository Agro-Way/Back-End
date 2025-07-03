import type { Request, Response, NextFunction } from 'express'
import { BadRequestException } from '../../exceptions/bad-request.js'
import { ErrorCode } from '../../exceptions/root.js'
import { prisma } from '../../utils/prisma.js'

export const addAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rua, cidade, provincia, municipio, userId } = req.body

    const existUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!existUser) {
      next(
        new BadRequestException('usuario não encontrado', ErrorCode.BAD_REQUEST)
      )
    }

    const newAddress = await prisma.address.create({
      data: {
        rua,
        cidade,
        provincia,
        municipio,
        user: {
          connect: { id: userId },
        },
      },
    })

    res.status(201).json({ newAddress })
  } catch (error) {
    console.error(error)
    next(
      new BadRequestException(
        'problemas na criação de endereços',
        ErrorCode.BAD_REQUEST
      )
    )
  }
}
