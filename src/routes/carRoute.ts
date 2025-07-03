import { Router } from 'express'
import { createCar } from '../controller/carController/carController.js'
import { driverMiddleware } from '../middleware/driverMiddleware.js'
import { authMiddleware } from '../middleware/auth.js'
import { errorHandler } from '../error-hendler.js'

const carRoutes = Router()
carRoutes.post('/', [authMiddleware, driverMiddleware], errorHandler(createCar))

export default carRoutes
