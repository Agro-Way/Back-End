import { Router } from 'express'
import authRoutes from './authRoute.js'
import DriverRoutes from './driverRoutes.js'
import userRoutes from './userRoutes.js'

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/user', userRoutes)
rootRouter.use('/drivers', DriverRoutes)
rootRouter.use('/users', userRoutes)

export default rootRouter
