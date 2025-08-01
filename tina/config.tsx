import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import PageCollection from "./collection/page";
import Tag from "./collection/tag";
import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";
import { LocalAuthProvider, defineConfig } from "tinacms";
import { CustomMediaStore } from '@/lib/custom-media-store';


const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
const contentApiUrl = process.env.TINA_PUBLIC_CONTENT_API_URL;

if (!process.env.TINA_PUBLIC_CONTENT_API_URL) {
  throw new Error("Missing TINA_PUBLIC_CONTENT_API_URL");
}

const config = defineConfig({
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  contentApiUrlOverride: contentApiUrl,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      return CustomMediaStore;
    },
  },
  schema: {
    collections: [
      TinaUserCollection,
      PageCollection,
      Post,
      Author,
      Tag,
      Global,
    ],
  },
});

export default config;