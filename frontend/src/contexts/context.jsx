import { createContext, useContext, useEffect, useState } from 'react';
import api from "../api"

export const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser ()
  }, [])

  const getUser = () => {
    api
      .get("/api/user/data/")
      .then((res) => res.data)
      .then((data) => { setUser(data) })//; console.log(data)
      .catch((err) => alert(err))
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
