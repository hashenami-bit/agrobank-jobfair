import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Placeholder />} />
          <Route path="trade" element={<Placeholder />} />
          <Route path="markets" element={<Placeholder />} />
          <Route path="leaderboard" element={<Placeholder />} />
          <Route path="*" element={<Placeholder />} />
        </Route>
      </Routes>
    </div>
  );
}