import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { SlideProvider } from '../contexts/SlideContext';

export default function Layout() {

  return (
    <SlideProvider>
    <div className="relative antialiased selection:bg-[var(--brand-green)] selection:text-white min-h-screen bg-[var(--bg)]">
      {/* Global Grid Lines Container */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none flex justify-center">
        <div className="w-full max-w-7xl h-full border-x border-[var(--border)] relative">
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-[var(--border)]"></div>
          <div className="absolute right-1/3 top-0 bottom-0 w-px bg-[var(--border)]"></div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
    </SlideProvider>
  );
}