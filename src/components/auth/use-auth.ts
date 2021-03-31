import { createContext, useContext } from 'react';
import { Session } from '../../lib/auth-cookies';

interface Auth {
  session: Session;
  logout: () => void;
  login: (answer) => void;
}

export const AuthContext = createContext<Auth>({
  session: null,
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
