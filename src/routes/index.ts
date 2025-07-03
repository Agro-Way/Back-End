import { Router } from 'express'
import authRoutes from './authRoute.js'
import userRoutes from './userRoutes.js'
import carRoutes from './carRoute.js'
import categoryRoute from './categoryRoute.js'
import uploadImageRoute from './uploadImageRoute.js'
import productRoute from './productRoute.js'
import addressRoute from './addressRoute.js'
import cartRoutes from './cartRoutes.js'

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/users', userRoutes)
rootRouter.use('/cars', carRoutes)
rootRouter.use('/categories', categoryRoute)
rootRouter.use('/products', uploadImageRoute)
rootRouter.use('/products', productRoute)
rootRouter.use('/addresses', addressRoute)
rootRouter.use('/cart-items', cartRoutes)

export default rootRouter
