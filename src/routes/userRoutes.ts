import { Router, type Request, type Response, type NextFunction } from 'express'
import {
  createDriver,
  getDriverById,
  getListUsers,
  getUserById,
} from '../controller/userController/userController.js'
import { errorHandler } from '../error-hendler.js'
import { authMiddleware } from '../middleware/auth.js'
import { producerMiddleware } from '../middleware/producerMiddleware.js'
import { driverMiddleware } from '../middleware/driverMiddleware.js'

const userRoutes = Router()

userRoutes.get(
  '/',
  [authMiddleware, producerMiddleware],
  errorHandler(getListUsers)
)
userRoutes.get(
  '/:id',
  [authMiddleware, producerMiddleware],
  errorHandler(getUserById)
)
userRoutes.get(
  '/:id/driver',
  [authMiddleware, driverMiddleware],
  errorHandler(getDriverById)
)
userRoutes.post(
  '/:id/driver',
  [authMiddleware, driverMiddleware],
  errorHandler(createDriver)
)

export default userRoutes
