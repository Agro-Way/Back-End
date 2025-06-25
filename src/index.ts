import cors from 'cors'
import express from 'express'
import rootRouter from './routes/index.js'
import SwaggerUi from 'swagger-ui-express'
// @ts-ignore
import swaggerDocuments from '../swagger.json'
import { ErrorMiddleware } from './middleware/errors.js'
import { PrismaClient } from '../generated/prisma/index.js'

const app = express()
app.use(express.json())
const PORT = 3000

const allowedOrigins = ['https://agroway-frontend.netlify.app']
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: 'GET,PUT,POST,DELETE',
}
app.use(cors(options))

export const prisma = new PrismaClient({})
app.use('/api', rootRouter)
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocuments))
app.use(ErrorMiddleware)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
