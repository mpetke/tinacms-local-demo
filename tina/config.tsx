import nextConfig from '../next.config'
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

// TODO: next-auth not working with next 15
// const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const contentApiUrl = process.env.TINA_PUBLIC_CONTENT_API_URL;

if (!process.env.TINA_PUBLIC_CONTENT_API_URL) {
  throw new Error("Missing TINA_PUBLIC_CONTENT_API_URL");
}

const config = defineConfig({
  // authProvider: isLocal
  //   ? new LocalAuthProvider()
  //   : new UsernamePasswordAuthJSProvider(),
  authProvider: new LocalAuthProvider(),
  contentApiUrlOverride: contentApiUrl,
  build: {
    publicFolder: "public",
    outputFolder: "admin",
    basePath: nextConfig.basePath?.replace(/^\//, '') || '', // The base path of the app (could be /blog)
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