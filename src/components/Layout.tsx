import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout: React.FC<{ title: string }> = (props) => {
  const router = useRouter();

  // /page/path => ["", "page", "path"]
  const paths = router.asPath.split('/').map(decodeURI);
  const root = paths.slice(0, 2).join('/');

  return (
    <>
      <Head>
        <title>{`Dunscombe Family Movies - ${props.title}`}</title>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="//vjs.zencdn.net/6.1.0/video-js.css" rel="stylesheet" />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white pt-4">
          <div className=" border-b-2 border-gray-100">
            <nav className="py-4">
              <div className="flex items-end">
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
            </nav>
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
};

export default Layout;
