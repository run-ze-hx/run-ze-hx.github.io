import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { useSceneStore } from '@store/sceneStore';
import { useI18nStore } from '@store/i18nStore';
import { getPost, posts } from '@content/posts';
import CodeBlock from '@components/ui/CodeBlock';
import TableOfContents from '@components/ui/TableOfContents';

const mdxComponents = {
  code: (props: { children?: React.ReactNode; className?: string }) => {
    const { children, className } = props;
    const isBlock = typeof children === 'string' && children.includes('\n');
    if (isBlock) {
      return (
        <CodeBlock lang={className?.replace('language-', '') || 'tsx'}>
          {children}
        </CodeBlock>
      );
    }
    return (
      <code className="font-mono text-[0.85em] px-1 py-0.5 rounded bg-cyan/10 text-cyan">
        {children}
      </code>
    );
  },
  pre: (props: { children?: React.ReactNode }) => <>{props.children}</>,
  h1: () => null,
  h2: (props: { children?: React.ReactNode }) => {
    const text = String(props.children ?? '');
    const id = slugify(text);
    return (
      <h2
        id={id}
        data-toc-level={2}
        className="font-display text-2xl md:text-3xl font-bold text-white mt-12 mb-4 scroll-mt-32 border-l-2 border-cyan pl-4"
      >
        {props.children}
      </h2>
    );
  },
  h3: (props: { children?: React.ReactNode }) => {
    const text = String(props.children ?? '');
    const id = slugify(text);
    return (
      <h3
        id={id}
        data-toc-level={3}
        className="font-display text-xl font-bold text-cyan mt-8 mb-3 scroll-mt-32"
      >
        {props.children}
      </h3>
    );
  },
  p: (props: { children?: React.ReactNode }) => (
    <p className="text-white/80 leading-[1.85] mb-5 text-[15px]">{props.children}</p>
  ),
  ul: (props: { children?: React.ReactNode }) => (
    <ul className="my-5 space-y-2 text-white/80 text-[15px] leading-relaxed list-none">
      {props.children}
    </ul>
  ),
  ol: (props: { children?: React.ReactNode }) => (
    <ol className="my-5 space-y-2 text-white/80 text-[15px] leading-relaxed list-decimal pl-6">
      {props.children}
    </ol>
  ),
  li: (props: { children?: React.ReactNode }) => (
    <li className="relative pl-5 before:content-['▸'] before:absolute before:left-0 before:text-cyan/60">
      {props.children}
    </li>
  ),
  blockquote: (props: { children?: React.ReactNode }) => (
    <blockquote className="my-6 pl-5 border-l-2 border-magenta/60 bg-magenta/[0.04] py-2 pr-3 text-white/70 italic">
      {props.children}
    </blockquote>
  ),
  a: (props: { href?: string; children?: React.ReactNode }) => (
    <a
      href={props.href}
      className="text-cyan underline underline-offset-2 hover:text-magenta transition"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
    >
      {props.children}
    </a>
  ),
  table: (props: { children?: React.ReactNode }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-cyan/20">
      <table className="w-full text-sm text-white/80">{props.children}</table>
    </div>
  ),
  thead: (props: { children?: React.ReactNode }) => (
    <thead className="bg-cyan/[0.06] text-cyan/90 font-mono text-xs tracking-wider">
      {props.children}
    </thead>
  ),
  th: (props: { children?: React.ReactNode }) => (
    <th className="text-left p-3 font-semibold">{props.children}</th>
  ),
  td: (props: { children?: React.ReactNode }) => (
    <td className="p-3 border-t border-white/5">{props.children}</td>
  ),
  hr: () => (
    <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
  ),
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{Number}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

export default function Article() {
  const { slug = '' } = useParams();
  const setRouteMode = useSceneStore((s) => s.setRouteMode);
  const t = useI18nStore((s) => s.t);
  const articleRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

  const post = getPost(slug);

  useEffect(() => {
    setRouteMode('article');
    window.scrollTo(0, 0);
  }, [slug, setRouteMode]);

  useEffect(() => {
    const root = articleRef.current;
    if (!root) return;
    const headings = root.querySelectorAll<HTMLElement>('[data-toc-level]');
    const next = Array.from(headings).map((h) => ({
      id: h.id,
      text: h.textContent ?? '',
      level: Number(h.dataset.tocLevel),
    }));
    setToc(next);
  }, [slug, post]);

  const Component = useMemo(() => post?.Component, [post]);

  if (!post || !Component) {
    return (
      <div className="min-h-screen pt-32 px-8">
        <p className="text-white/50">{t('notfound.desc')}</p>
        <Link to="/posts" className="term-btn inline-block mt-6">
          {t('article.back')}
        </Link>
      </div>
    );
  }

  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;

  return (
    <div className="relative min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
        <article ref={articleRef} className="min-w-0">
          <Link
            to="/posts"
            className="inline-block font-mono text-[11px] tracking-widest text-white/40 hover:text-cyan transition mb-8"
          >
            {t('article.back')}
          </Link>

          <header className="mb-10 border-l-2 border-cyan pl-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-magenta/40 text-magenta/90 bg-magenta/5 tracking-widest">
                {post.level}
              </span>
              <span className="font-mono text-[10px] text-white/40">
                {post.date} · {post.readTime} {t('article.readTime')}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-black text-white neon-text">
              {post.title}
            </h1>
            <p className="mt-4 text-white/60 leading-relaxed">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tg) => (
                <span
                  key={tg}
                  className="px-2 py-0.5 text-[10px] font-mono text-cyan/70 border border-cyan/25 rounded bg-cyan/5"
                >
                  #{tg}
                </span>
              ))}
            </div>
          </header>

          <div className="prose-cyber">
            <MDXProvider components={mdxComponents as never}>
              <Component />
            </MDXProvider>
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                to={`/posts/${prev.slug}`}
                className="group p-4 rounded border border-white/10 hover:border-cyan/40 transition"
              >
                <div className="text-[10px] font-mono text-white/30 mb-1">← PREV</div>
                <div className="text-sm text-white/70 group-hover:text-cyan transition truncate">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/posts/${next.slug}`}
                className="group p-4 rounded border border-white/10 hover:border-cyan/40 transition text-right"
              >
                <div className="text-[10px] font-mono text-white/30 mb-1">NEXT →</div>
                <div className="text-sm text-white/70 group-hover:text-cyan transition truncate">
                  {next.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>

        <aside className="hidden lg:block">
          <TableOfContents items={toc} />
        </aside>
      </div>
    </div>
  );
}
