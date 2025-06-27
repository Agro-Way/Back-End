import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import dotenv from 'dotenv'
import { r2 } from '../config/r2.js'

dotenv.config()

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'produtos'
const CLOUDFLARE_ENDPOINT =
  process.env.CLOUDFLARE_ENDPOINT ||
  'https://api.cloudflare.com/client/v4/accounts'

interface PreSignedUrlResponse {
  uploadUrl: string
  key: string
  publicUrl: string
}

export const generatePreSignedUrl = async (
  fileName: string,
  contentType: string
): Promise<PreSignedUrlResponse> => {
  const key = `produtos/${Date.now()}-${fileName.replace(/\s/g, '_')}`
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  })

  try {
    const uploadUrl = await getSignedUrl(r2, command, {
      expiresIn: 3600, // URL valid for 1 hour
    })
    const publicUrl = `${CLOUDFLARE_ENDPOINT}/${R2_BUCKET_NAME}/${key}`
    return {
      uploadUrl,
      key,
      publicUrl,
    }
  } catch (error) {
    console.error('Erro ao gerar URL pré-assinada:', error)
    throw new Error('Falha ao gerar URL pré-assinada')
  }
}

export const deleteObjectFromR2 = async (key: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  })

  try {
    await r2.send(command)
  } catch (error) {
    console.error('Erro ao deletar objeto do R2:', error)
    throw new Error('Falha ao deletar objeto do R2')
  }
}
