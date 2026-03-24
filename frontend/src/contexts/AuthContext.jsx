import { createContext, useContext, useEffect, useState } from 'react';
import api from "../api";
import { ACCESS_TOKEN } from "../constants"

export const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      api.get("/api/user/data/")
        .then(res  => res.data)
        .then(data => setUser(data))
        .catch(err => {});
    }
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
