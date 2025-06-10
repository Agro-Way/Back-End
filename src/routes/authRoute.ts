import { Router } from 'express'
import { login, signup } from '../controller/authController.js'

const authRoute: Router = Router()

authRoute.post('/signup', signup)
authRoute.post('/login', login)

export default authRoute
