import { prisma } from '../index.js'
import type { Request, Response } from 'express'

export const createDriver = async (req: Request, res: Response) => {
  const { driver_license, age, userId } = req.body

  const driver = await prisma.driver.create({
    data: {
      driver_license,
      age,
      userId,
    },
  })
}
