/// <reference types="vite/client" />
/// <reference types="@mdx-js/globals" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
  export const frontmatter: {
    title: string;
    level: string;
    excerpt: string;
    date: string;
    tags: string[];
    readTime: number;
  };
}
