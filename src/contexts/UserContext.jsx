import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const toast = useToast();

  // Load user name from localStorage on component mount
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    const savedToken = localStorage.getItem('token');
    if (savedUserName) {
      setUserName(savedUserName);
    }
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Will act as both login and register
  const login = async (name) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, { name });
      const token = response.data.token;
      console.log(response);
      toast({
        title: 'Welcome!',
        description: `Hello ${name.trim()}, let's play Bingo!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setUserName(name);
      setToken(token);
      localStorage.setItem('userName', name);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  const logout = () => {
    setUserName('');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('bingoBoard');
  };

  const value = {
    userName,
    login,
    logout,
    isLoggedIn: !!userName,
    token
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 