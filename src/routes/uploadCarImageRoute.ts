import { Router } from 'express'
import { uploadImage } from '../controller/uploadCarImage.js'

const uploadCarImageRoute = Router()

uploadCarImageRoute.post('/generate-upload-url', uploadImage)

export default uploadCarImageRoute
