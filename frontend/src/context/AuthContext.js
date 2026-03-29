import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = [
  { id: 1, email: 'admin@ccn.edu', password: 'admin123', name: 'Admin User', role: 'Admin', avatar: 'AU' },
  { id: 2, email: 'student@ccn.edu', password: 'student123', name: 'Ali Hassan', role: 'Student', avatar: 'AH' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('ccn_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('ccn_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password, remember) => {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return { success: false, error: 'Invalid email or password.' };
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    if (remember) localStorage.setItem('ccn_user', JSON.stringify(safeUser));
    else sessionStorage.setItem('ccn_user', JSON.stringify(safeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ccn_user');
    sessionStorage.removeItem('ccn_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
