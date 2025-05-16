import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authTokens) {
      setUser({ username: 'User' });
    } else {
      setUser(null);
    }
  }, [authTokens]);

  const loginUser = async (credentials) => {
    try {
      const response = await api.post('/token/', credentials);
      setAuthTokens(response.data);
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      setUser({ username: 'User' });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
