import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  structuredData: {
    type: 'object',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.date,
      dateModified: doc.date,
      description: doc.description,
      image: doc.image
        ? `https://raviatluri.in${doc.image}`
        : `https://raviatluri.in/api/og?title=${doc.title}`,
      url: `https://raviatluri.in/${doc.slug}`,
      author: {
        '@type': 'Person',
        name: 'Lee Robinson',
      },
    }),
  },
  preview: {
    type: 'string',
    resolve: (doc) => {
      const preview = doc.body.raw.substring(0, 100).replace(/\n/g, ' ');

      return preview;
    },
  },
};

export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `articles/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
    },
    author: {
      type: 'string',
    },
  },
  computedFields,
}));

export const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: `snippets/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
  },
  computedFields,
}));

export const Event = defineNestedType(() => ({
  name: 'Event',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true,
    },
    image: {
      type: 'string',
    },
    link: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
  },
}));

export const Timeline = defineDocumentType(() => ({
  name: 'Timeline',
  filePathPattern: `events.yaml`,
  contentType: 'data',
  isSingleton: true,
  fields: {
    events: {
      type: 'list',
      of: Event,
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Article, Snippet, Timeline],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
