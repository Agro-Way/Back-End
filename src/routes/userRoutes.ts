import { Router, type Request, type Response, type NextFunction } from 'express'
import {
  createDriver,
  getDriverById,
  getListUsers,
  getUserById,
} from '../controller/userController.js'
import { errorHandler } from '../error-hendler.js'

const userRoutes = Router()

userRoutes.get('/', getListUsers)
userRoutes.get('/:id', errorHandler(getUserById))
userRoutes.get('/:id/driver', errorHandler(getDriverById))
userRoutes.post('/:id/driver', errorHandler(createDriver))

export default userRoutes
