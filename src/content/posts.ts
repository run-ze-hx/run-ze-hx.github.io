const modules = import.meta.glob('../../posts/*.mdx', { eager: true });

export interface Post {
  slug: string;
  title: string;
  level: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number;
  Component: React.ComponentType<Record<string, unknown>>;
}

function isFrontmatter(v: unknown): v is Post {
  return (
    !!v &&
    typeof v === 'object' &&
    typeof (v as Partial<Post>).title === 'string'
  );
}

export const posts: Post[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.match(/([\w-]+)\.mdx$/)![1];
    const m = mod as Record<string, unknown>;
    const fm = (m.frontmatter ?? {}) as Partial<Post>;
    const post: Post = {
      slug,
      title: fm.title ?? slug,
      level: fm.level ?? '',
      excerpt: fm.excerpt ?? '',
      date: fm.date ?? '1970-01-01',
      tags: fm.tags ?? [],
      readTime: fm.readTime ?? 0,
      Component: (m.default as Post['Component']) ?? (() => null),
    };
    return post;
  })
  .filter(isFrontmatter)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
