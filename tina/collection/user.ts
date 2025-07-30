import type { Collection } from "tinacms";

const User: Collection = {
  name: "pages",
        label: "Pages",
        path: "site",
        ui: {
          // @ts-ignore
          defaultItem: {
            layout: "layout",
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            options: [
              "layout",
              // add more layouts here
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
};
export default User;
