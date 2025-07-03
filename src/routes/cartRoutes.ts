import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { errorHandler } from '../error-hendler.js'
import { createCartController } from '../controller/cartController/createCartController.js'
import { deleteCartItems } from '../controller/cartController/deleteCartItems.js'
import { changeCartItemsQuantity } from '../controller/cartController/changeCartITemsQuantity.js'
import { getCartItems } from '../controller/cartController/getCartItems.js'

const cartRoutes = Router()

cartRoutes.get('/', [authMiddleware], errorHandler(getCartItems))
cartRoutes.post('/', [authMiddleware], errorHandler(createCartController))
cartRoutes.delete('/:id', [authMiddleware], errorHandler(deleteCartItems))
cartRoutes.put('/:id', [authMiddleware], errorHandler(changeCartItemsQuantity))

export default cartRoutes
