import { Outlet } from 'react-router-dom';
import { Navbar } from '@/views/shared/layouts/Navbar';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
