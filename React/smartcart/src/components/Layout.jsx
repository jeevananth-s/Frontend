import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900 selection:bg-primary-200 selection:text-black">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>
      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-bold text-xs">
              S
            </div>
            <span className="font-bold text-gray-900 tracking-tight">SmartCart.</span>
          </div>
          <p className="text-sm text-gray-400 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
