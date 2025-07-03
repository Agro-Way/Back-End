import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../../utils/prisma.js'
import { BadRequestException } from '../../exceptions/bad-request.js'
import { ErrorCode } from '../../exceptions/root.js'

export const getAllAdresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getAddresses = await prisma.address.findMany({})
    res.json(getAddresses)
  } catch (error) {
    console.log(error)
    next(
      new BadRequestException('Endereço não encontrado', ErrorCode.BAD_REQUEST)
    )
  }
}
