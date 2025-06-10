import express from 'express'
import rootRouter from './routes/index.js'
import { PrismaClient } from '../generated/prisma/index.js'
import SwaggerUi from 'swagger-ui-express'
// @ts-ignore
import swaggerDocuments from '../swagger.json'

const app = express()
app.use(express.json())
const port = 3000

export const prisma = new PrismaClient({})
app.use('/api', rootRouter)
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocuments))

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
