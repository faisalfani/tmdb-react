import { Outlet } from 'react-router-dom';
import { Navbar } from '@/views/shared/layouts/Navbar';

interface RootLayoutProps {
  onSearchClick?: () => void;
}

export function RootLayout({ onSearchClick }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar onSearchClick={onSearchClick} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
