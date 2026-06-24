import { Routes, Route } from 'react-router-dom';
import Shell from '@components/Shell';
import Home from '@components/pages/Home';
import Posts from '@components/pages/Posts';
import Article from '@components/pages/Article';
import About from '@components/pages/About';
import NotFound from '@components/pages/NotFound';

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:slug" element={<Article />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Shell>
  );
}
