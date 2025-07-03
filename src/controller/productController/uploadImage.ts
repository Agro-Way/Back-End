import dotenv from 'dotenv'
import { r2 } from '../../config/r2.js'
import type { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { BadRequestException } from '../../exceptions/bad-request.js'
import { ErrorCode } from '../../exceptions/root.js'
import { InternalServerError } from '../../exceptions/internal-server-error.js'
import { prisma } from '../../utils/prisma.js'
import {
  deleteObjectFromR2,
  generatePreSignedUrl,
} from '../../service/cloudflareService.js'

dotenv.config()

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params
    const { fileName, contentType } = req.body
    if (!fileName || !contentType) {
      return next(
        new BadRequestException(
          'Nome do arquivo e tipo de conteúdo são obrigatórios.',
          ErrorCode.BAD_REQUEST
        )
      )
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return next(
        new BadRequestException(
          'Produto não encontrado.',
          ErrorCode.BAD_REQUEST
        )
      )
    }

    if (product.imagekey) {
      await deleteObjectFromR2(product.imagekey)
    }

    const { uploadUrl, key, publicUrl } = await generatePreSignedUrl(
      fileName,
      contentType
    )

    await prisma.product.update({
      where: { id: productId },
      data: {
        imageUrl: publicUrl,
        imagekey: key,
      },
    })
    res.status(200).json({
      uploadUrl,
      key,
      publicUrl,
    })
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error)
    next(
      new InternalServerError(
        'Erro ao fazer upload da imagem',
        ErrorCode.INTERNAL_SERVER_ERROR
      )
    )
  }
}
