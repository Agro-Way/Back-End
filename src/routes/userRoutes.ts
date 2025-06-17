import { Router, type Request, type Response } from 'express'
import { getListUsers } from '../controller/userController.js'

const userRoutes: Router = Router()

userRoutes.get('/', getListUsers)

export default userRoutes
