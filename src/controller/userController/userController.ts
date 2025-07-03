import type { NextFunction, Request, Response } from 'express'
import { prisma } from '../../utils/prisma.js'
import { UserNotFoundException } from '../../exceptions/not-found.js'
import { ErrorCode } from '../../exceptions/root.js'
import { BadRequestException } from '../../exceptions/bad-request.js'

export const getListUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const total = await prisma.user.count()

    const users = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: {
        created_At: 'desc',
      },
    })

    res.json({
      paginaAtual: page,
      totalPaginas: Math.ceil(total / limit),
      totalRegistros: total,
      dados: users,
    })
  } catch (error) {
    console.error(error)
    next(
      new BadRequestException('Erro ao buscar usuários', ErrorCode.BAD_REQUEST)
    )
  }
}

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return next(
        new UserNotFoundException(
          'Usuário não encontrado',
          ErrorCode.USER_NOT_FOUND
        )
      )
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    next(
      new BadRequestException('Erro ao buscar usuário', ErrorCode.BAD_REQUEST)
    )
  }
}

export const getDriverById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const driverId = req.params.id

  try {
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
    })

    if (!driver) {
      return next(
        new UserNotFoundException(
          'Condutor não encontrado',
          ErrorCode.USER_NOT_FOUND
        )
      )
    }

    res.json(driver)
  } catch (error) {
    console.error(error)
    next(
      new UserNotFoundException(
        'Erro ao buscar condutor',
        ErrorCode.USER_NOT_FOUND
      )
    )
  }
}

export const createDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = String(req.params.id)
  const { driver_license, age } = req.body

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!existingUser) {
      return next(
        new UserNotFoundException(
          'Usuário não encontrado',
          ErrorCode.USER_NOT_FOUND
        )
      )
    }

    const existingDriver = await prisma.driver.findFirst({
      where: { driver_license },
    })

    if (existingDriver) {
      return next(
        new BadRequestException(
          'Condutor com esta carta de condução já existe',
          ErrorCode.BAD_REQUEST
        )
      )
    }

    const driver = await prisma.driver.create({
      data: {
        driver_license,
        age,
        user: { connect: { id: userId } },
      },
    })

    res.status(201).json({ driver })
  } catch (error) {
    console.error(error)
    next(
      new BadRequestException('Erro ao criar condutor', ErrorCode.BAD_REQUEST)
    )
  }
}
