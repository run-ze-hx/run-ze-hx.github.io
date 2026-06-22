# 杨 · 个人网站

> 在架构与像素之间寻找平衡 · [4K · CYBERPUNK · 3D]

部署在 GitHub Pages 的静态个人网站。

## 技术栈

- **构建**：Vite 5 + TypeScript
- **核心**：React 18 + React Router 6 (HashRouter)
- **3D**：Three.js + React Three Fiber + Drei
- **拖拽**：@dnd-kit/core + sortable
- **状态**：Zustand (persist)
- **动画**：Framer Motion + GSAP
- **样式**：Tailwind CSS + 自定义赛博朋克层
- **内容**：MDX

## 开发

```bash
npm install
npm run dev      # 本地开发
npm run build    # 构建
npm run preview  # 预览构建产物
```

## 部署

push 到 `main` 分支自动触发 GitHub Actions → GitHub Pages。

## 设计文档

完整设计规格见 [docs/superpowers/specs/2026-06-22-personal-website-design.md](./docs/superpowers/specs/2026-06-22-personal-website-design.md)。
