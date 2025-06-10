import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const PORT = process.env.PORT
// biome-ignore lint/style/noNonNullAssertion: <explanation>
export const JWT_SECRET = process.env.SECRET_KEY!
