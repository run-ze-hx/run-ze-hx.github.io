import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { posts } from '@content/posts';
import { useI18nStore } from '@store/i18nStore';

interface Line {
  kind: 'in' | 'out' | 'err';
  text: string;
}

const HELP = `YFT-OS v0.1 · available commands:
  help          列出命令
  ls posts      列出所有文章
  open <slug>   打开文章（如：open react-fiber）
  goto <path>   路由跳转（如：goto /posts）
  whoami        我是谁
  reset         重置面板布局
  clear         清屏
  exit          关闭终端`;

export default function ConsoleTerminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'YFT-OS v0.1 · type "help" for commands' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const t = useI18nStore((s) => s.t);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const push = (...items: Line[]) => setLines((prev) => [...prev, ...items]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    push({ kind: 'in', text: cmd });
    const [name, ...args] = cmd.split(/\s+/);
    switch (name) {
      case 'help':
        push({ kind: 'out', text: HELP });
        break;
      case 'ls':
        if (args[0] === 'posts') {
          push(
            { kind: 'out', text: `total ${posts.length}` },
            ...posts.map((p) => ({
              kind: 'out' as const,
              text: `${p.level.padEnd(10)}  ${p.slug}.mdx  —  ${p.title}`,
            })),
          );
        } else {
          push({ kind: 'err', text: `ls: ${args[0] || '?'}: not found` });
        }
        break;
      case 'open': {
        const slug = args[0];
        if (!slug) {
          push({ kind: 'err', text: 'open: missing slug' });
          break;
        }
        if (!posts.find((p) => p.slug === slug)) {
          push({ kind: 'err', text: `open: ${slug}: not found` });
          break;
        }
        push({ kind: 'out', text: `→ navigating to /posts/${slug}` });
        setOpen(false);
        navigate(`/posts/${slug}`);
        break;
      }
      case 'goto': {
        const path = args[0];
        if (!path) {
          push({ kind: 'err', text: 'goto: missing path' });
          break;
        }
        push({ kind: 'out', text: `→ navigating to ${path}` });
        setOpen(false);
        navigate(path);
        break;
      }
      case 'whoami':
        push({ kind: 'out', text: 'visitor@yft · frontend enthusiast' });
        break;
      case 'reset':
        localStorage.removeItem('yft-layout');
        push({ kind: 'out', text: 'layout cleared · refresh to apply' });
        break;
      case 'clear':
        setLines([]);
        break;
      case 'exit':
        setOpen(false);
        break;
      default:
        push({
          kind: 'err',
          text: `${t('console.unknown')} ${name} · type "help"`,
        });
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-void/70 backdrop-blur-sm flex items-end justify-center p-4 md:p-10"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-3xl h-[60vh] rounded-xl border border-cyan/30 bg-deep/90 shadow-cyber-lg flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-cyan/20 bg-cyan/[0.04]">
          <span className="font-mono text-[10px] tracking-widest text-cyan/80">
            {t('console.title')} · {t('console.prompt')}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-[10px] text-white/40 hover:text-magenta"
          >
            [ × ]
          </button>
        </div>
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed"
        >
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === 'in'
                  ? 'text-cyan'
                  : l.kind === 'err'
                    ? 'text-magenta'
                    : 'text-white/70 whitespace-pre-wrap'
              }
            >
              {l.kind === 'in' ? `$ ${l.text}` : l.text}
            </div>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
              setInput('');
            }}
            className="flex items-center gap-2 mt-2"
          >
            <span className="text-cyan/60 font-mono text-[12px]">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent border-none outline-none font-mono text-[12px] text-cyan"
              placeholder="type a command..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}
