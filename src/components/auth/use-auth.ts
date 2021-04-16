import { createContext, useContext } from 'react';
import { Session } from '../../lib/auth-cookies';

interface Auth {
  session: Session;
  isLoading: boolean;
  logout: () => void;
  login: (answer) => void;
}

export const AuthContext = createContext<Auth>({
  session: null,
  isLoading: true,
  logout: () => {
    throw new Error('Missing Implementation');
  },
  login: () => {
    throw new Error('Missing Implementation');
  },
});

export const useAuth = (): Auth => {
  return useContext(AuthContext);
};
