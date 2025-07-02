import cors from 'cors'
import express from 'express'
import rootRouter from './routes/index.js'
import SwaggerUi from 'swagger-ui-express'
// @ts-ignore
import swaggerDocuments from '../swagger.json'
import { ErrorMiddleware } from './middleware/errors.js'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import hpp from 'hpp'
import type { Request, Response, NextFunction } from 'express'
import basicAuth from 'express-basic-auth'

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: ['*'], // ou '*'' apenas em dev
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // se usa cookies/autenticação
}))
  

// segurança
app.disable('X-powered-by') // remover headers de tecnologia usada, proteção de headers http
app.use(helmet()) // protegendo headers ou cabeçalhos http

const limit = rateLimit({
  windowMs: 1 * 60 * 1000, // apenas 1 minuto
  max: 50, // ,máximo de requisições por ip
  standardHeaders: true,
  legacyHeaders: false,
  message: '🚫 Excedeu o limite de requisições. Tente novamente mais tarde.',
})
app.use(limit) // protegendo a aplicaão contra ataque de brute-force
app.use(cookieParser()) // importando o cookie para enviar e receber
app.use(morgan('combined'))
app.use(hpp()) // proteção contra poluição de parâmetro

// redirecionamento de http para https seguro
if (process.env.NODE_ENV === 'production') {
  // Permite detectar HTTPS corretamente atrás de proxy (ex: Heroku, Vercel, Nginx)
  app.set('trust proxy', 1)

  app.use((req: Request, res: Response, next: NextFunction) => {
    // Para servidores atrás de proxy (como Heroku), req.secure pode não funcionar corretamente.
    // Então usamos x-forwarded-proto
    const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https'

    if (!isSecure) {
      return res.redirect(`https://${req.headers.host}${req.url}`)
    }

    next()
  })
}

app.use('/api', rootRouter)
app.use(
  '/api-docs',
  basicAuth({
    users: { admin: 'senhaSuperSegura123' },
    challenge: true,
  }),
  SwaggerUi.serve,
  SwaggerUi.setup(swaggerDocuments)
)
app.use(ErrorMiddleware)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
