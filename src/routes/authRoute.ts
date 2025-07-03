import { Router } from 'express'
import { login } from '../controller/authentication/loginController.js'
import { signup } from '../controller/authentication/registerController.js'
import { errorHandler } from '../error-hendler.js'

const authRoute: Router = Router()

authRoute.post('/signup', errorHandler(signup))
authRoute.post('/login', errorHandler(login))

export default authRoute
