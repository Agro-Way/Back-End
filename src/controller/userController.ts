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
