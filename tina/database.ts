import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { MongodbLevel } from "mongodb-level";
import { GitHubProvider } from "tinacms-gitprovider-github";
import dotenv from "dotenv";

dotenv.config();

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

if (!isLocal && !process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined in production");
}

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default isLocal
  ? createDatabase({
      gitProvider: new GitHubProvider({
        branch,
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
      }),
      databaseAdapter: new MongodbLevel({
        collectionName: "tinacms",
        dbName: "tinacms",
        mongoUri: process.env.MONGODB_URI!,
      }),
      namespace: branch,
    })
  : createLocalDatabase();