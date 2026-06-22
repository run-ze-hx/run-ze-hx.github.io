# 杨林峰 · 个人网站设计规格

> 创建日期：2026-06-22
> 状态：已确认 · 进入实施

## 1. 目标与定位

构建一个部署在 GitHub Pages 的静态个人网站，面向中大厂前端面试官与同行：

- **核心目标**：在 3 秒内让访客感受到作者的技术深度与工程品味
- **视觉**：赛博朋克 / 未来科技感（4K 超现实感）
- **交互**：3D 空间中的可拖拽面板（DOM 层 + 3D 背景联动）
- **内容**：8 篇从《前端心得》知识库重写的公众向深度文
- **语言**：UI 中英双语，文章中文
- **部署**：GitHub Pages（HashRouter）

## 2. 架构方案

**方案 B：3D 背景 + DOM 浮层面板**

R3F 负责 3D 背景（粒子场、shader 流光、中央雕塑），面板是真实 DOM（`position: absolute` + `transform: translate3d` + `preserve-3d`）。dnd-kit 处理拖拽，Zustand 共享相机/面板状态联动。

理由：性能好、文字清晰、SEO 友好、可访问性正常、与作者 React 栈一致。

## 3. 项目结构

```
personal-website/
├── public/
│   ├── models/         # 3D 模型 (.glb)
│   ├── textures/       # 4K 法线/粗糙度贴图
│   └── posts/          # 文章 MDX
├── src/
│   ├── 3d/             # R3F 场景层
│   │   ├── Scene.tsx
│   │   ├── Particles.tsx          # 4 层粒子（星尘 + 3 环 + 丝带）
│   │   ├── CentralObject.tsx
│   │   └── shaders/
│   ├── components/
│   │   ├── panels/     # 可拖拽面板
│   │   ├── DragLayer.tsx
│   │   ├── Shell.tsx
│   │   └── ui/
│   ├── pages/
│   │   ├── Home.tsx    # 3D 拖拽桌面
│   │   ├── Article.tsx
│   │   └── About.tsx
│   ├── store/
│   │   ├── layoutStore.ts         # 面板位置（persist）
│   │   ├── sceneStore.ts          # 3D 场景状态
│   │   └── i18nStore.ts
│   ├── content/posts.ts           # MDX 加载器
│   ├── lib/{dnd,i18n}.ts
│   └── styles/{global,cyberpunk}.css
├── vite.config.ts                 # base = '/my_website/'
├── tailwind.config.ts
└── package.json
```

## 4. 3D 视觉层级

```
L0  星尘背景    5000+ 静态点          深空感
L1  环绕粒子轨道 三层同心环            视觉核心
    内环  800 粒子 顺时针 青 1.0x
    中环 1200 粒子 逆时针 品红 0.6x
    外环 600 粒子 顺时针 紫 0.3x
L2  能量丝带    3-5 条曲线粒子流
L3  中央雕塑    响应面板运动
L4  面板光晕    DOM 面板下的霓虹投影
```

**互动联动**
- 鼠标移动 → 环倾斜 ±15°
- 面板拖拽 → 对应方向环密度增加
- 进入文章页 → 环收缩包围阅读区
- 滚轮 → 环半径微缩放

**技术**：`InstancedMesh` + 自定义 GLSL，环位置在 vertex shader 内实时计算（CPU 零参与）。

## 5. 拖拽面板系统

| ID | 面板 | 内容 | 默认位置 |
|---|---|---|---|
| profile | 个人卡片 | 头像、姓名、标签 | 左上 |
| articles | 文章列表 | 8 篇卡片 | 右上 |
| stack | 技术栈雷达 | 8 项 + 熟练度 | 中下 |
| contact | 联系方式 | GitHub、邮箱、微信 | 左下 |
| console | 隐藏终端 | ` 键唤出 | 右下 |

**拖拽物理**：PointerSensor（5px 阈值）+ KeyboardSensor；拖拽时 z+=80、释放 spring 回弹；屏幕内 ±20px 安全区。

**3D 感**：`perspective: 1800px` + `preserve-3d` + 鼠标偏移驱动 `rotateX/Y ±4deg`；玻璃材质 `backdrop-filter: blur(20px) saturate(180%)`。

**持久化**：`layoutStore` 用 Zustand persist 保存到 localStorage key `yft-layout`。

**可访问性**：键盘拖拽；`prefers-reduced-motion` 关闭倾斜；移动端 `<768px` 自动堆叠。

## 6. 文章内容

**精选 8 篇**

| # | 标题（公众向） | 原笔记 | 等级 |
|---|---|---|---|
| 1 | React Fiber：一次渲染的旅行 | React Fiber 与 Diff 算法 | 天·高级 |
| 2 | 从 DOM 到屏幕：浏览器渲染管线全解 | 浏览器渲染管线与性能优化 | 天·高级 |
| 3 | 前端全局架构：数据流转的地图 | 前端全局架构与数据流转 | 天·中级 |
| 4 | 混合加密实战：AES + RSA 在评标系统的落地 | 前端加密实现 AES 与 RSA | 地·高级 |
| 5 | Axios 拦截器：一份关注点分离的范本 | Axios 封装与拦截器设计 | 地·中级 |
| 6 | JS 错误捕获全景图：三道墙与两条铁律 | JS 错误捕获全景图 | 玄·高级 |
| 7 | Event Loop：从调用栈到任务队列 | Event Loop 与任务队列 | 玄·高级 |
| 8 | 组件三层拆分：页面/业务/通用的边界感 | 组件三层拆分架构 | 地·中级 |

**重写原则**：标题场景化、加决策动机、加评标系统脱敏代码、加对比表、嵌踩坑案例。

**MDX 管道**：`import.meta.glob('../posts/*.mdx', { eager: true })` 收集 frontmatter，按 date 倒序。

**文章页交互**：环收缩包围中央阅读区；标题/代码/配图视差 ±20px；`<CodeBlock>` 赛博朋克主题；内嵌 R3F 小图；右侧 sticky TOC。

## 7. i18n、路由、构建

**i18n**：Zustand store，`zh` / `en` 字典，切换器在右上角，默认跟随 `navigator.language`。

**路由**：HashRouter，路由表：
- `/` Home
- `/posts` Posts
- `/posts/:slug` Article
- `/about` About
- `/console` Console（彩蛋）

切换动效用 `<AnimatePresence>` + Framer Motion，3D Canvas 不卸载。

**构建**：Vite，`base: '/my_website/'`，manualChunks 拆 `three / react / dnd / mdx`。

**4K 资源**：`.glb` + Draco 压缩；按 DPR 加载 4K/2K 纹理；字体 `Noto Sans SC` + `JetBrains Mono`。

**部署**：`.github/workflows/deploy.yml` → `actions/deploy-pages@v4`。

**性能预算**：首屏 JS gzip < 200KB；LCP < 2.5s；60fps 4K；Lighthouse > 85。

## 8. 测试、错误处理、风险

**测试**：Vitest（store / 组件 / MDX 解析）+ 1 个 Playwright happy path + 手动 Lighthouse + axe-core。

**错误处理**：
- WebGL 不支持 / 上下文丢失 → CSS 降级 + 自动重建
- 4K 纹理失败 → 2K
- .glb 失败 → 程序化几何体
- 路由 404 → 赛博朋克 404 页
- MDX 解析错误 → ErrorBoundary
- localStorage 配额超限 → 清 i18n 保 layout

**风险**：4K 掉帧（RAF + `will-change` + `contain`）；dnd + preserve-3d 冲突（拖拽时临时关旋转）；GH Pages 路由（HashRouter）；首屏 JS（manualChunks + 动态 import）；移动端（堆叠 + 关 3D）。

## 9. 里程碑

| # | 里程碑 | 预估 |
|---|---|---|
| M0 | 项目骨架 + 构建链 | 0.5 天 |
| M1 | 3D 场景基底（4 层粒子） | 1.5 天 |
| M2 | 面板系统 + dnd-kit + Zustand | 1.5 天 |
| M3 | 文章管道 + 前 2 篇 + 阅读页 | 2 天 |
| M4 | i18n + 路由切换动效 | 0.5 天 |
| M5 | 剩余 6 篇文章 + About 页 | 2 天 |
| M6 | 终端彩蛋 + 404 + 降级 | 0.5 天 |
| M7 | 性能调优 + 部署 | 0.5 天 |

**总计**：约 9 天全职 / 3 周业余。

## 10. 技术栈清单

```
build:        vite ^5, @vitejs/plugin-react, vite-plugin-mdx
core:         react ^18, react-dom, react-router-dom ^6 (HashRouter)
3d:           three ^0.160, @react-three/fiber ^8, @react-three/drei ^9
dnd:          @dnd-kit/core ^6, @dnd-kit/sortable ^8, @dnd-kit/utilities
state:        zustand ^4
animation:    framer-motion ^11, gsap ^3 (scroll)
style:        tailwindcss ^3, postcss, autoprefixer
mdx:          @mdx-js/react, @mdx-js/rollup
i18n:         (自写最小字典，不引 i18next)
test:         vitest, @testing-library/react, playwright
```
