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
