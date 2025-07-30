import type { NextApiRequest, NextApiResponse } from "next";
import { TinaNodeBackend } from "@tinacms/datalayer";
import database from "@/tina/database";
import { WrappedAuthProvider } from "@/tina/authProvider"; // adjust path if needed

const backend = TinaNodeBackend({
  authProvider: new WrappedAuthProvider(),
  databaseClient: database,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return backend(req, res);
}