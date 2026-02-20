import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { storage, User } from '@/services/storage';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = storage.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const register = async (username: string, password: string) => {
    try {
      const response = await api.register(username, password);
      if (response.success) {
        const newUser = { id: response.userId, username };
        storage.setUser(newUser);
        setUser(newUser);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Failed to connect to server' };
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await api.login(username, password);
      if (response.success) {
        const loggedInUser = { id: response.userId, username };
        storage.setUser(loggedInUser);
        setUser(loggedInUser);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Failed to connect to server' };
    }
  };

  const logout = () => {
    storage.clearUser();
    setUser(null);
  };

  return { user, loading, register, login, logout };
}
