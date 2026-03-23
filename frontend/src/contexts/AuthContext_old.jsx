import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('church_auth_user');
    const savedProfile = localStorage.getItem('church_auth_profile');
    
    if (savedUser && savedProfile) {
      setUser(JSON.parse(savedUser));
      setProfile(JSON.parse(savedProfile));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setUser(mockUser);
    setProfile(mockProfile);
    localStorage.setItem('church_auth_user', JSON.stringify(mockUser));
    localStorage.setItem('church_auth_profile', JSON.stringify(mockProfile));
  };

  const register = async (userData) => {
    await login(userData.username, userData.password);
    return newUser;
  };

  const logout = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('church_auth_user');
    localStorage.removeItem('church_auth_profile');
  };


  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
