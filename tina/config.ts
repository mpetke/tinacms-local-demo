import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";
import Tag from "./collection/tag";
import { TinaUserCollection } from "tinacms-authjs/dist/tinacms";
import { LocalAuthProvider, defineConfig } from "tinacms";


const isLocal = process.env.FORCE_DEV === "true";
const useLocalAuth = process.env.USE_LOCAL_AUTH === "false";

const contentApiUrl =
  process.env.TINA_PUBLIC_CONTENT_API_URL ||
  (isLocal ? "http://localhost:4001/graphql" : undefined);

if (!contentApiUrl) {
  throw new Error("Missing TINA_PUBLIC_CONTENT_API_URL");
}

const config = defineConfig({
  contentApiUrlOverride: contentApiUrl,
  authProvider: new LocalAuthProvider(),
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
      static: false,
    },
  },
  schema: {
    collections: [
      TinaUserCollection,
      Page,
      Post,
      Author,
      Tag,
      Global,
    ],
  },
});

export default config;