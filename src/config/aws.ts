import dotenv from 'dotenv'
import { S3Client } from '@aws-sdk/client-s3'
// import { env } from '../env.js'

dotenv.config()

const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID
const secretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY
const endpoint = process.env.CLOUDFLARE_ENDPOINT

if (!accessKeyId || !secretAccessKey || !endpoint) {
  throw new Error(
    'Missing Cloudflare R2 credentials or endpoint in environment variables'
  )
}

export const r2 = new S3Client({
  region: 'auto',
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})
