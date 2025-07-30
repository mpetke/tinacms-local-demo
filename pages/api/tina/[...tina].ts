import type { NextApiRequest, NextApiResponse } from 'next';
import { TinaNodeBackend } from '@tinacms/datalayer';
import database from '@/tina/database';
import { WrappedAuthProvider } from '@/tina/authProvider';

const handler = TinaNodeBackend({
  authProvider: new WrappedAuthProvider(),
  databaseClient: database,
});

export default function handlerAPI(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res);
}