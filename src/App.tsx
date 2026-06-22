import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Shell from '@components/Shell';

const Home = lazy(() => import('@components/pages/Home'));
const Posts = lazy(() => import('@components/pages/Posts'));
const Article = lazy(() => import('@components/pages/Article'));
const About = lazy(() => import('@components/pages/About'));
const NotFound = lazy(() => import('@components/pages/NotFound'));

function Fallback() {
  return (
    <div className="fixed inset-0 grid place-items-center text-cyan text-sm font-mono tracking-widest">
      <div className="animate-pulse">LOADING...</div>
    </div>
  );
}

export default function App() {
  return (
    <Shell>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:slug" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Shell>
  );
}
