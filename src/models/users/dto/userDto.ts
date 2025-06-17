import type { Role, Status } from '../../../../generated/prisma/index.js'

export interface UserDto {
  name: string
  email: string
  telefone: string
  password: string
  confirmPassword: string
  status: Status
  role: Role
  created_At: string
  updated_At: string
}
