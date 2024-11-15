import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

const defaultComputedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  images: {
    type: "list",
    resolve: (doc) => {
      return (
        doc.body.raw.match(/(?<=<Image[^>]*\bsrc=")[^"]+(?="[^>]*\/>)/g) || []
      );
    },
  },
};

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.md`,
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields: defaultComputedFields,
}));

export const Item = defineDocumentType(() => ({
  name: "Item",
  filePathPattern: `items/**/*.md`,
  contentType: "markdown",
  fields: {
    id: {
      type: "number",
      default: 1,
    },
    title: {
      type: "string",
      required: true,
    },
    icon: {
      type: "string",
      default: "/placeholder.svg",
    },
    description: {
      type: "string",
    },
    website: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
    },
    twitter: {
      type: "string",
    },
    published: {
      type: "date",
    },
    featured: {
      type: "boolean",
      default: false,
    },
    monthlyVisits: {
      type: "number",
      default: 1000,
    },
    domainRating: {
      type: "number",
      default: 80,
    },
    authorityScore: {
      type: "number",
      default: 80,
    },
    categories: {
      type: "list",
      of: {
        type: "string",
      },
      required: true,
    },
    subCategories: {
      type: "list",
      of: {
        type: "string",
      },
      required: true,
    },
    discount: {
      type: "number",
    },
    hot: {
      type: "boolean",
      default: false,
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields: defaultComputedFields,
}));

export const Guide = defineDocumentType(() => ({
  name: "Guide",
  filePathPattern: `guides/**/*.md`,
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    featured: {
      type: "boolean",
      default: false,
    },
  },
  computedFields: defaultComputedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.md`,
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    categories: {
      type: "list",
      of: {
        type: "enum",
        options: ["news", "education"],
        default: "news",
      },
      required: true,
    },
    related: {
      type: "list",
      of: {
        type: "string",
      },
    },
  },
  computedFields: defaultComputedFields,
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.md`,
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields: defaultComputedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Page, Doc, Guide, Post, Item],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const [codeEl] = node.children;

            if (codeEl.tagName !== "code") return;

            node.__rawString__ = codeEl.children?.[0].value;
          }
        });
      },
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: false,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
        },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return;
            }

            const preElement = node.children.at(-1);
            if (preElement.tagName !== "pre") {
              return;
            }

            preElement.properties["__rawString__"] = node.__rawString__;
          }
        });
      },
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
