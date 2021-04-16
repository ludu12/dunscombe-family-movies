import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from './use-auth';
import { useQuery } from 'react-query';

export interface AuthProps {
  redirect?: boolean;
}

export const AuthProvider: React.FC<AuthProps> = ({ redirect, children }) => {
  const router = useRouter();

  const { data: session, isLoading } = useQuery('session', async () => {
    const res = await axios.get('session');
    return res.data.session;
  });

  React.useEffect(() => {
    if (!isLoading && !session && redirect) {
      router.push('/login');
    }
  }, [isLoading, session]);

  const login = async (answer): Promise<void> => {
    try {
      await axios.post('login', {
        answer,
      });
      router.push('/');
    } catch (e) {
      alert(e.response?.data?.message || 'Error');
    }
  };

  const logout = async (): Promise<void> => {
    await axios.get('logout');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isLoading, session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
