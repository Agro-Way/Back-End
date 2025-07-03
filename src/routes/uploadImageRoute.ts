import { Router } from 'express'
import { errorHandler } from '../error-hendler.js'
import { authMiddleware } from '../middleware/auth.js'
import { uploadImage } from '../controller//productController/uploadImage.js'
import { producerMiddleware } from '../middleware/producerMiddleware.js'

const uploadImageRoute = Router()

uploadImageRoute.post(
  ':id/generate-upload-url',
  [authMiddleware, producerMiddleware],
  errorHandler(uploadImage)
)

export default uploadImageRoute
