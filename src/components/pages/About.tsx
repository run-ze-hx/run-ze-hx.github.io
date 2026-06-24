import { useEffect } from 'react';
import { useSceneStore } from '@store/sceneStore';
import { useI18nStore } from '@store/i18nStore';

const timeline = [
  {
    year: '2024',
    title: 'AI 辅助评标系统',
    role: '前端核心开发',
    desc: '负责三层组件架构、混合加密链路、代码分割、Token 全链路、文件分片上传等模块。React + TypeScript + Ant Design + Vite。',
  },
  {
    year: '2024',
    title: '前端知识体系搭建',
    role: '主理人',
    desc: '5 大类 57 篇笔记，天地玄黄四级知识分级，覆盖 Git / React / TypeScript / JavaScript / 浏览器 / Vite / 部署。',
  },
  {
    year: '2023',
    title: '团队协作与分工',
    role: '前端负责人',
    desc: '前后端联调分工、角色路由设计、MR 流程规范。形成"把握职责、顺应规律"的协作认知。',
  },
  {
    year: '2022',
    title: '深入浏览器原理',
    role: '学习者',
    desc: '从 DOM 到 GPU 合成的完整渲染管线、Fiber 架构、Event Loop、闭包与作用域链、JS 错误捕获拓扑。',
  },
];

const skills = [
  {
    title: '架构层',
    color: '#FFD700',
    items: ['前端全局架构', '三层组件拆分', '路由守卫', '代码分割策略'],
  },
  {
    title: '工程层',
    color: '#8B7355',
    items: ['Vite 构建体系', 'Axios 封装', 'Token 管理', '混合加密'],
  },
  {
    title: '原理层',
    color: '#5C4A1A',
    items: ['React Fiber', '浏览器渲染管线', 'Event Loop', 'JS 错误捕获'],
  },
  {
    title: '业务层',
    color: '#D4AF37',
    items: ['AI 评标系统', '文件分片上传', '多角色路由', '评标桌面'],
  },
];

const beliefs = [
  {
    title: '把握职责',
    body: '明确分工不是"你做前端、他做后端"，而是要理解每个人在当前阶段最该聚焦的事情。职责不清会导致重复劳动或关键环节没人负责。',
  },
  {
    title: '顺应规律',
    body: '每个人有自己的工作节奏和思维习惯。强行统一节奏不如因人而异地安排。职责是"做什么"，规律是"怎么做"——两者结合职责才能真正落地。',
  },
  {
    title: '架构来自约束',
    body: '好架构不是加出来的，是减出来的。React / Zustand / Tailwind 这一套的真正价值是"限制了你能做什么"——选择面变窄，决策更快，bug 更少。',
  },
];

export default function About() {
  const setRouteMode = useSceneStore((s) => s.setRouteMode);
  const t = useI18nStore((s) => s.t);

  useEffect(() => {
    setRouteMode('page');
  }, [setRouteMode]);

  return (
    <div className="relative min-h-screen pt-28 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-16">
          <div className="font-mono text-[10px] tracking-[0.5em] text-cyan/60 mb-2">
            {t('about.title').toUpperCase()} · YANG · LINFENG
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-white neon-text">
            {t('app.tagline')}
          </h1>
          <p className="mt-6 text-white/60 max-w-2xl leading-relaxed">
            {t('profile.summary')}
          </p>
        </header>

        <section className="mb-20">
          <div className="font-mono text-[10px] tracking-widest text-cyan/60 mb-6">
            CAPABILITY · MAP
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((g) => (
              <div
                key={g.title}
                className="p-5 rounded-lg border border-white/10 bg-deep/40 backdrop-blur-sm"
                style={{ borderColor: `${g.color}30` }}
              >
                <h3
                  className="font-display text-sm font-bold tracking-widest mb-3"
                  style={{ color: g.color }}
                >
                  {g.title.toUpperCase()}
                </h3>
                <ul className="space-y-1.5">
                  {g.items.map((it) => (
                    <li key={it} className="text-xs text-white/70 font-mono">
                      ▸ {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="font-mono text-[10px] tracking-widest text-cyan/60 mb-6">
            {t('about.timeline').toUpperCase()}
          </div>
          <ol className="relative border-l border-white/10 ml-2">
            {timeline.map((item, i) => (
              <li key={i} className="mb-10 pl-8 relative">
                <span
                  className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-cyan"
                  style={{ boxShadow: '0 0 12px #FFD700' }}
                />
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-xs text-magenta tracking-widest">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">
                    / {item.role}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <div className="font-mono text-[10px] tracking-widest text-cyan/60 mb-6">
            BELIEFS · 三条原则
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {beliefs.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-lg border border-cyan/20 bg-gradient-to-br from-deep/60 to-void/60"
              >
                <h3 className="font-display text-xl font-bold text-cyan mb-3">
                  {b.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
