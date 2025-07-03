import { Router } from 'express'
import { errorHandler } from '../error-hendler.js'
import { authMiddleware } from '../middleware/auth.js'
import { uploadImage } from '../controller/productController/uploadImage.js'
import { estoqueController } from '../controller/stockController/estoqueController.js'
import { producerMiddleware } from '../middleware/producerMiddleware.js'
import {
  createProduct,
  getProducts,
} from '../controller/productController/productController.js'

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

productRoute.post(
  '/:productId/buy',
  [authMiddleware, producerMiddleware],
  errorHandler(estoqueController)
)

productRoute.get('/', errorHandler(getProducts))

export default productRoute
