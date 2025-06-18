import { Router, type Request, type Response, type NextFunction } from 'express'
import {
  createDriver,
  getListUsers,
  getUserById,
} from '../controller/userController.js'

const userRoutes = Router()

userRoutes.get('/', getListUsers)
userRoutes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(getUserById(req, res)).catch(next)
})
userRoutes.post(
  '/:id/driver',
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(createDriver(req, res)).catch(next)
  }
)

export default userRoutes
