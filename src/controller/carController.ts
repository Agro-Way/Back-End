import { BadRequestException } from '../exceptions/bad-request.js'
import { ErrorCode } from '../exceptions/root.js'
import { prisma } from '../utils/prisma.js'
import type { Request, Response, NextFunction } from 'express'

export const getCarById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const carId = req.params.id

  try {
    const car = await prisma.car.findUnique({
      where: { id: carId },
    })

    if (!car) {
      return next(
        new BadRequestException('Carro não encontrado', ErrorCode.BAD_REQUEST)
      )
    }

    res.status(200).json(car)
  } catch (error) {
    console.error('Error fetching car:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { brand, model, plate, driverId } = req.body
  try {
    const existingCar = await prisma.car.findFirst({
      where: { plate },
    })

    if (existingCar) {
      return next(
        new BadRequestException(
          'Car with this plate already exists',
          ErrorCode.BAD_REQUEST
        )
      )
    }

    const car = await prisma.car.create({
      data: {
        brand,
        model,
        plate,
        driver: { connect: { id: driverId } },
      },
    })
    res.status(201).json(car)
  } catch (error) {
    console.error('Error creating car:', error)
    next(new BadRequestException('Error creating car', ErrorCode.BAD_REQUEST))
  }
}

export const getCarsByDriverId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const driverId = req.params.id

  try {
    const cars = await prisma.car.findMany({
      where: { driverId },
    })

    if (!cars || cars.length === 0) {
      return next(
        new BadRequestException(
          'No cars found for this driver',
          ErrorCode.BAD_REQUEST
        )
      )
    }

    res.status(200).json(cars)
  } catch (error) {
    console.error('Error fetching cars:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
