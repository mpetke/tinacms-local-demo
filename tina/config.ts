// import { defineConfig, LocalAuthProvider } from "tinacms";
// import database from "./database";
// import {
//   TinaUserCollection,
//   UsernamePasswordAuthJSProvider,
// } from "tinacms-authjs/dist/tinacms"; // ✅ Deep import is required

// const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

// export default defineConfig({
//   authProvider: isLocal
//     ? new LocalAuthProvider()
//     : new UsernamePasswordAuthJSProvider(),
//   database,
//   media: {
//     tina: {
//       mediaRoot: "uploads",
//       publicFolder: "public",
//       static: false,
//     },
//   },
//   schema: {
//     collections: [
//       TinaUserCollection, // required for authjs
//       {
//         name: "pages",
//         label: "Pages",
//         path: "content/pages",
//         fields: [
//           { type: "string", name: "title", label: "Title", isTitle: true, required: true },
//           { type: "rich-text", name: "body", label: "Body", isBody: true },
//         ],
//       },
//     ],
//   },
// });

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







// import { defineConfig, LocalAuthProvider } from "tinacms";
// import database from "./database"; // from your database.ts
// import { UsernamePasswordAuthJSProvider, TinaUserCollection } from "tinacms-authjs/dist/tinacms";

// const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

// export default defineConfig({
//   contentApiUrlOverride: "/api/tina/gql",
//   authProvider: isLocal
//     ? new LocalAuthProvider()
//     : new UsernamePasswordAuthJSProvider(), // needed for login

//   database,

//   media: {
//     tina: {
//       mediaRoot: "uploads",         // relative to public folder
//       publicFolder: "public",       // where static files live
//       static: false,                // we serve media at runtime, not during build
//     },
//   },

//   build: {
//     publicFolder: "public",         // Next.js static files
//     outputFolder: "admin",          // where Tina builds the UI
//     basePath: "",                   // change if you're using a subpath
//   },

//   schema: {
//     collections: [
//       TinaUserCollection,           // required for UsernamePasswordAuthJSProvider

//       {
//         name: "pages",
//         label: "Pages",
//         path: "content/pages",
//         fields: [
//           { type: "string", name: "title", label: "Title", isTitle: true, required: true },
//           { type: "rich-text", name: "body", label: "Body", isBody: true },
//         ],
//       },

//       // Add more collections as needed
//     ],
//   },
// });





// import { defineConfig, LocalAuthProvider } from "tinacms";
// import database from "./database";

// const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

// export default defineConfig({
//   authProvider: new LocalAuthProvider(),
//   database,
//   media: {
//     tina: {
//       publicFolder: "public",
//       mediaRoot: "uploads",
//       static: false,
//     },
//   },
//   schema: {
//     collections: [
//       {
//         name: "pages",
//         label: "Pages",
//         path: "content/pages",
//         fields: [
//           {
//             type: "string",
//             name: "title",
//             label: "Title",
//             isTitle: true,
//             required: true, // ✅ THIS LINE IS REQUIRED
//           },
//           {
//             type: "rich-text",
//             name: "body",
//             label: "Body",
//             isBody: true,
//           },
//         ],
//       },
//     ],
//   },
// });