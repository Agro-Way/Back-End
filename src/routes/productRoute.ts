import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { producerMiddleware } from '../middleware/producerMiddleware.js'
import { errorHandler } from '../error-hendler.js'
import { createProduct, getProducts } from '../controller/productController.js'

const productRoute = Router()

productRoute.post(
  '/:id/:categoryId',
  [authMiddleware, producerMiddleware],
  errorHandler(createProduct)
)

productRoute.get('/', errorHandler(getProducts))

export default productRoute
