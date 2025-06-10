import type { User } from '../../generated/prisma/index.js'
import express from 'express'

declare module 'express' {
  export interface Request {
    user?: User
  }
}
