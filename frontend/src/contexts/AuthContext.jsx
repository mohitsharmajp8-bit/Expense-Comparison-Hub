import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const readStorage = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage('bm_user', null));
  const login = (userData) => { setUser(userData); localStorage.setItem('bm_user', JSON.stringify(userData)); };
  const logout = () => { setUser(null); localStorage.removeItem('bm_user'); localStorage.removeItem('token'); };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
