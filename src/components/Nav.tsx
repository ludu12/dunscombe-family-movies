import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from './auth/use-auth';

const Nav: React.FC = () => {
  const router = useRouter();
  const { session, logout } = useAuth();

  const paths = router.asPath.split('/').map(decodeURI);
  const root = paths.slice(0, 2).join('/');

  return (
    <nav className="py-4">
      <div className="flex justify-between items-end">
        <div
          className={`flex flex-1 justify-start items-end ${
            session ? '' : 'invisible'
          }`}
        >
          <div className="h-8 w-8 mr-4">
            <Link href="/">
              <a className="h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={`${root === '/' ? '2' : '1'}`}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </a>
            </Link>
          </div>
          <div className={`${root === '/movies' ? 'font-bold' : ''}`}>
            <Link href="/movies">
              <a className="h-8 w-8 italic">Movies</a>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-center h-8 w-8 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
        </div>
        <div
          className={`flex flex-1 justify-end cursor-pointer h-8 w-8 ${
            session ? '' : 'invisible'
          }`}
          title={'Destroy Session'}
          onClick={logout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
