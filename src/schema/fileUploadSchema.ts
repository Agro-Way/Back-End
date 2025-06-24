import { z } from 'zod'

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  contentType: z
    .string()
    .regex(/^(image\/jpeg|image\/png|image\/gif)$/, 'tipo de arquivo inválido'),
})
