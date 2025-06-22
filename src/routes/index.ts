import { Router } from 'express'
import authRoutes from './authRoute.js'
import userRoutes from './userRoutes.js'
import uploadCarImageRoute from './uploadCarImageRoute.js'

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/user', userRoutes)
rootRouter.use('/users', userRoutes)
rootRouter.use('/upload', uploadCarImageRoute)

export default rootRouter
