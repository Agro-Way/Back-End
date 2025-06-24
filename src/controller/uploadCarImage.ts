import dotenv from 'dotenv'
import { r2 } from '../config/aws.js'
import type { Request, Response } from 'express'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { fileUploadSchema } from '../schema/fileUploadSchema.js'
import { randomUUID } from 'node:crypto'

dotenv.config()

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { fileName, contentType } = fileUploadSchema.parse(req.body)
    const fileKey = randomUUID().concat('-').concat(fileName)
    const signedurl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileKey,
        ContentType: contentType,
      })
    )

    res.status(200).json({
      signedurl,
      fileUrl: `https://${process.env.R2_BUCKET_NAME}.${process.env.CLOUDFLARE_ENDPOINT}/${fileKey}`,
    })
  } catch (error) {
    console.log('Error generating upload URL:', error)
    res.status(500).json({ error: 'Erro ao gerar URL de upload' })
  }
}
