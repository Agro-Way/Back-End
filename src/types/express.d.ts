import express from 'express'
import type { User } from '../../generated/prisma/index.js'

declare module 'express' {
  export interface Request {
    user?: User
  }
}
