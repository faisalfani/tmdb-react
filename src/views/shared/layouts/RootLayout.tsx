import { Outlet } from 'react-router-dom';
import { Navbar } from '@/views/shared/layouts/Navbar';

interface RootLayoutProps {
  onSearchClick?: () => void;
  watchlistCount?: number;
}

export function RootLayout({ onSearchClick, watchlistCount }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar onSearchClick={onSearchClick} watchlistCount={watchlistCount} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
