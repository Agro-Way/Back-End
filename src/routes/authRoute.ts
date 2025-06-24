import { type NextFunction, type Request, type Response, Router } from 'express'
import { login } from '../controller/authController.js'
import { signup } from '../controller/authController.js'
import { errorHandler } from '../error-hendler.js'

const authRoute: Router = Router()

authRoute.post('/signup', errorHandler(signup))
authRoute.post('/login', errorHandler(login))

export default authRoute
