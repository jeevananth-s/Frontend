import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('sql_study_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Basic mock validation since we don't have a real backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('sql_study_users_db') || '[]');
        const existingUser = users.find(u => u.email === email && u.password === password);
        
        if (existingUser) {
          const userData = { name: existingUser.name, email: existingUser.email };
          setUser(userData);
          localStorage.setItem('sql_study_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800); // Simulate network delay
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('sql_study_users_db') || '[]');
        if (users.find(u => u.email === email)) {
          reject(new Error('User with this email already exists'));
        } else {
          const newUser = { name, email, password };
          users.push(newUser);
          localStorage.setItem('sql_study_users_db', JSON.stringify(users));
          
          const userData = { name, email };
          setUser(userData);
          localStorage.setItem('sql_study_user', JSON.stringify(userData));
          resolve(userData);
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sql_study_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
