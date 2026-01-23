import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ownerName, setOwnerName] = useState('');

  // Check if user is logged in on mount (from localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('ownerAuth');
    if (savedAuth) {
      const { isLoggedIn: savedLoggedIn, ownerName: savedName } = JSON.parse(savedAuth);
      setIsLoggedIn(savedLoggedIn);
      setOwnerName(savedName);
    }
  }, []);

  const login = (name) => {
    setIsLoggedIn(true);
    setOwnerName(name);
    localStorage.setItem('ownerAuth', JSON.stringify({ isLoggedIn: true, ownerName: name }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setOwnerName('');
    localStorage.removeItem('ownerAuth');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, ownerName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
