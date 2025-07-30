// pages/api/tina/[...tina].ts

import type { NextApiRequest, NextApiResponse } from 'next'
import {
  TinaNodeBackend,
  LocalBackendAuthProvider,
} from '@tinacms/datalayer'
import database from '@/tina/database'

const handler = TinaNodeBackend({
  authProvider: LocalBackendAuthProvider(),
  databaseClient: database,
})

export default function handlerAPI(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res)
}