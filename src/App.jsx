import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';
import Admin from './pages/Admin';

// Sends a page-view ping to our own counter (api/track). Admin pages are not counted.
function TrackPageViews() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname }),
    }).catch(() => {});
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="">
      <TrackPageViews />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Placeholder />} />
          <Route path="trade" element={<Placeholder />} />
          <Route path="markets" element={<Placeholder />} />
          <Route path="leaderboard" element={<Placeholder />} />
          <Route path="*" element={<Placeholder />} />
        </Route>
      </Routes>
      <Analytics />
    </div>
  );
}