import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { compareList } = useCompare();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 shadow-[0_1px_3px_rgb(0,0,0,0.05)] backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xl group-hover:bg-primary-600 transition-colors">
                S
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors">
                SmartCart.
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <NavLink 
                to="/" 
                className={({isActive}) => `px-4 py-2 rounded-md text-sm font-medium transition-all ${isActive ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                Store
              </NavLink>
              <NavLink 
                to="/compare" 
                className={({isActive}) => `px-4 py-2 rounded-md text-sm font-medium transition-all px-4 py-2 flex items-center gap-2 ${isActive ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                Compare
                {compareList?.length > 0 && (
                  <span className="bg-primary-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                    {compareList.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end mr-2">
                  <span className="text-sm font-medium text-gray-900 leading-none">{user.name}</span>
                  <span className="text-xs text-gray-500 mt-1 capitalize">{user.role}</span>
                </div>
                
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black transition-all shadow-sm"
                    title="Dashboard"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-black text-white hover:bg-gray-800 hover:shadow-soft transition-all transform active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
