import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from "../constants";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        await fetch('http://localhost:8000/api/user/data/', {
          method: 'GET',    
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(response => {
          console.log(response.json());
        });
        // console.log('Success:', response.body);
        // const result = await response.json();
        // setUser(result);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
    // try {
    //   const res = await api.get('/api/user/data/');
    //   setUser(res.data);
    //   console.log(res.data);
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   setLoading(false);
    // }
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
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