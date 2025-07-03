import { Router } from 'express'
import {
  createCategory,
  getCategories,
} from '../controller/categoryController/categoryController.js'
import { errorHandler } from '../error-hendler.js'
import { authMiddleware } from '../middleware/auth.js'
import { producerMiddleware } from '../middleware/producerMiddleware.js'

const categoryRoute = Router()

categoryRoute.post(
  '/',
  [authMiddleware, producerMiddleware],
  errorHandler(createCategory)
)

categoryRoute.get('/', errorHandler(getCategories))

export default categoryRoute
