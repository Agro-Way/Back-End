import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { producerMiddleware } from '../middleware/producerMiddleware.js'
import { errorHandler } from '../error-hendler.js'
import { createProduct, getProducts } from '../controller/productController.js'
import { uploadImage } from '../controller/uploadImage.js'

const productRoute = Router()

productRoute.post(
  '/',
  [authMiddleware, producerMiddleware],
  errorHandler(createProduct)
)

productRoute.post(
  '/:productId/upload-url',
  [authMiddleware, producerMiddleware],
  errorHandler(uploadImage)
)

productRoute.get('/', errorHandler(getProducts))

export default productRoute
