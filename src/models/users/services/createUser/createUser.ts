import { hashSync } from 'bcrypt'
import { prisma } from '../../../../index.js'
import type { UserDto } from '../../dto/userDto.js'
import type { User } from '../../../../../generated/prisma/index.js'

export class CreateUser {
  async execute({
    name,
    email,
    password,
    confirmPassword,
    status,
    role,
    created_At,
    updated_At,
  }: UserDto): Promise<User> {
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userExists) {
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 12),
        confirmPassword: hashSync(confirmPassword, 12),
        status,
        role,
        created_At,
        updated_At,
      },
    })

    return user
  }
}
