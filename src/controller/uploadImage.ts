import dotenv from 'dotenv'
import { r2 } from '../config/aws.js'
import type { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

dotenv.config()

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const filename = `${uuid()}-${req.file?.originalname}`
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: filename,
      ContentType: req.file?.mimetype,
    })

    const uploadUrl = await getSignedUrl(r2, command, {
      expiresIn: 3600, // URL válido por 1 hora
    })

    res.status(200).json({ uploadUrl })
  } catch (error) {
    console.log('Error generating upload URL:', error)
    res.status(500).json({ error: 'Erro ao gerar URL de upload' })
  }
}
