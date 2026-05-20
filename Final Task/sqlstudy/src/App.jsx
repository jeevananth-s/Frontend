import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SQLLessons from './pages/SQLLessons';

// Placeholder components for extra pages
const Practice = () => <div className="p-8 text-center text-2xl font-bold dark:text-white">Practice Area - Coming Soon</div>;
const Quiz = () => <div className="p-8 text-center text-2xl font-bold dark:text-white">Quiz Arena - Coming Soon</div>;
const Profile = () => <div className="p-8 text-center text-2xl font-bold dark:text-white">User Profile - Coming Soon</div>;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'dark:bg-slate-800 dark:text-white',
              style: {
                borderRadius: '10px',
                background: 'var(--card)',
                color: 'var(--card-foreground)',
              },
            }}
          />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes inside Layout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="lessons" element={<SQLLessons />} />
              <Route path="practice" element={<Practice />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
