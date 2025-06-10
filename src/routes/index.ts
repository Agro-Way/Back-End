import { Router } from 'express'
import authRoutes from './authRoute.js'

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)

export default rootRouter
