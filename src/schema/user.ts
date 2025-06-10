import { z } from 'zod'

export const SignupSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Digite um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  role: z.enum(['USUARIO', 'PRODUTOR', 'CONDUTOR'], {
    errorMap: () => ({
      message: "O papel deve ser 'USUARIO', 'PRODUTOR' ou 'CONDUTOR'",
    }),
  }),
})
