import { useLocation } from 'react-router-dom';

// A generic placeholder component for mock routes
export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2);

  return (
    <div className="w-full max-w-7xl min-h-[70vh] flex flex-col items-center justify-center px-6 relative z-10">
      <div className="w-24 h-24 mb-8 rounded-full border border-white/10 skeuo-card flex items-center justify-center text-3xl">
        <iconify-icon icon="solar:code-file-linear" class="text-white/50"></iconify-icon>
      </div>
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">{pageName}</h1>
      <p className="text-white/50 text-sm tracking-wide max-w-md text-center">
        This is a placeholder page demonstrating the routing structure. The main content is located on the Home route.
      </p>
    </div>
  );
}