import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from './use-auth';

export interface AuthProps {
  redirect?: boolean;
}

export const AuthProvider: React.FC<AuthProps> = ({ redirect, children }) => {
  const [session, setSession] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    axios.get('session').then((r) => {
      setSession(r.data.session);
      if (!r.data.session && redirect) {
        router.push('/login');
      }
    });
  }, []);

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
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
