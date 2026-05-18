import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('smartcart_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('smartcart_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Don't store password in session
      const sessionUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email, role: foundUser.role };
      setUser(sessionUser);
      localStorage.setItem('smartcart_user', JSON.stringify(sessionUser));
      return { success: true };
    }
    
    // Hardcoded admin for testing
    if (email === 'admin@smartcart.com' && password === 'admin123') {
      const adminUser = { id: 'admin1', name: 'Admin', email, role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('smartcart_user', JSON.stringify(adminUser));
      return { success: true };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('smartcart_users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already in use' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app this would be hashed
      role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('smartcart_users', JSON.stringify(users));
    
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    setUser(sessionUser);
    localStorage.setItem('smartcart_user', JSON.stringify(sessionUser));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartcart_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
