import { Router } from 'express'
import { createCar } from '../controller/carController.js'
import type { Request, Response, NextFunction } from 'express'
import { driverMiddleware } from '../middleware/driverMiddleware.js'
import { authMiddleware } from '../middleware/auth.js'

const carRoutes = Router()
carRoutes.post(
  '/:id',
  // authMiddleware,
  driverMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createCar(req, res)
      return
    } catch (err) {
      next(err)
    }
  }
)

export default carRoutes
