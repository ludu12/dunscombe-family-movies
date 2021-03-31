import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Session } from '../../lib/auth-cookies';
import { AuthContext } from './use-auth';

export interface AuthProps {
  session: Session;
}

export const AuthProvider: React.FC<AuthProps> = ({ session, children }) => {
  const router = useRouter();

  const login = async (answer): Promise<void> => {
    try {
      await axios.post('api/login', {
        answer,
      });
      router.push('/');
    } catch (e) {
      alert(JSON.stringify(e.response, null, 2));
    }
  };

  const logout = async (): Promise<void> => {
    await axios.get('api/logout');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
