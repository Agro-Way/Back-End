import type { Request, Response } from 'express'
import { prisma } from '../index.js'

export const getListUsers = async (req: Request, res: Response) => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const total = await prisma.user.count()

    const users = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: {
        created_At: 'desc',
      },
    })

    res.json({
      paginaAtual: page,
      totalPaginas: Math.ceil(total / limit),
      totalRegistros: total,
      dados: users,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar usuarios' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao buscar usuário' })
  }
}

export const createDriver = async (req: Request, res: Response) => {
  const userId = String(req.params.id)
  const { driver_license, age } = req.body

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    const existingDriver = await prisma.driver.findFirst({
      where: { driver_license },
    })

    if (existingDriver) {
      return res
        .status(400)
        .json({ error: 'Condutor com esta carta de condução já existe' })
    }

    const driver = await prisma.driver.create({
      data: {
        driver_license,
        age,
        user: { connect: { id: userId } },
      },
    })

    res.status(201).json({ driver })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar condutor' })
  }
}
