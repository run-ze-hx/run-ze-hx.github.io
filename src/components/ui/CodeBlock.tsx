import { useEffect, useRef, useState } from 'react';

interface CodeBlockProps {
  children: string;
  lang?: string;
}

export default function CodeBlock({ children, lang = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-6 relative group rounded-lg overflow-hidden border border-cyan/20 bg-void/70 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-cyan/10 bg-cyan/[0.03]">
        <span className="font-mono text-[10px] tracking-widest text-cyan/70 uppercase">
          {lang}
        </span>
        <button
          onClick={onCopy}
          className="font-mono text-[10px] tracking-widest text-white/40 hover:text-cyan transition px-2 py-1 rounded border border-white/10 hover:border-cyan/40"
        >
          {copied ? '[ COPIED ]' : '[ COPY ]'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono">
        <code className="text-cyan/90">{children}</code>
      </pre>
    </div>
  );
}
