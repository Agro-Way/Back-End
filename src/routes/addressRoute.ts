import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { errorHandler } from '../error-hendler.js'
import { addAddress } from '../controller/addressController/addAddressController.js'
import { getAllAdresses } from '../controller/addressController/getAllAdresses.js'

const addressRoute = Router()

addressRoute.post('/', [authMiddleware], errorHandler(addAddress))
addressRoute.get('/', [authMiddleware], errorHandler(getAllAdresses))

export default addressRoute
