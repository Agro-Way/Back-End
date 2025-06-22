import { env } from '../env.js'
import { r2 } from '../config/aws.js'
import type { Request, Response } from 'express'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { uuid } from 'zod/v4'

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const filename = `${uuid()}.${req.body.key.split('.').pop()}`
    const signedurl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: filename,
        ContentType: req.body.contentType,
      })
    )

    res.status(200).json({
      signedurl,
      fileUrl: `https://${env.R2_BUCKET_NAME}.${env.CLOUDFLARE_ENDPOINT}/${filename}`,
    })
  } catch (error) {
    console.error('Error generating upload URL:', error)
    res.status(500).json({ error: 'Erro ao gerar URL de upload' })
  }
}
