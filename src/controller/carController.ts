import { prisma } from '../index.js'
import type { Request, Response } from 'express'

export const getCarById = async (req: Request, res: Response) => {
  const carId = req.params.id

  try {
    const car = await prisma.car.findUnique({
      where: { id: carId },
    })

    if (!car) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.status(200).json(car)
  } catch (error) {
    console.error('Error fetching car:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const createCar = async (req: Request, res: Response) => {
  const { brand, model, plate, image_url, driverId } = req.body
  try {
    const existingCar = await prisma.car.findFirst({
      where: { plate },
    })

    if (existingCar) {
      return res
        .status(409)
        .json({ error: 'Já existe um carro com esta matricula' })
    }

    const car = await prisma.car.create({
      data: {
        brand,
        model,
        plate,
        image_url,
        driver: { connect: { id: driverId } },
      },
    })
    res.status(201).json(car)
  } catch (error) {
    console.error('Error creating car:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
