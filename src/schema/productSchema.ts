import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'o nome do produto é obrigatório'),
  price: z.number().positive('o preço não pode ser negativo'),
  description: z.string().optional(),
  quantity: z.number().int().nonnegative('A quantidade não pode ser negativa'),
  imagekey: z.string().optional(),
  userId: z.string().uuid('Formato de ID de usuário inválido'),
  categoryId: z.string().uuid('Formato de ID de categoria inválido'),
})
