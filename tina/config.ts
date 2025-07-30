import Post from "./collection/post";
import Global from "./collection/global";
import Author from "./collection/author";
import Page from "./collection/page";
import Tag from "./collection/tag";

import { LocalAuthProvider, defineConfig } from "tinacms";
import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from "tinacms-authjs/dist/tinacms";

const isLocal =
  process.env.TINA_PUBLIC_IS_LOCAL === 'true' ||
  process.argv.includes('--local');

// @ts-ignore
const config = defineConfig({
  contentApiUrlOverride: process.env.TINA_PUBLIC_CONTENT_API_URL || undefined,
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
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
      Page, Post, Author, Tag, Global,
    ],
  },
});

export default config;