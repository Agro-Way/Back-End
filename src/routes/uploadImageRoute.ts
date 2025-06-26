import { Router } from 'express'
import { errorHandler } from '../error-hendler.js'
import { authMiddleware } from '../middleware/auth.js'
import { uploadImage } from '../controller/uploadImage.js'
import { producerMiddleware } from '../middleware/producerMiddleware.js'

const uploadImageRoute = Router()

uploadImageRoute.post(
  '/generate-upload-url',
  [authMiddleware, producerMiddleware],
  errorHandler(uploadImage)
)

export default uploadImageRoute
