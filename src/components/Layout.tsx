import React from 'react';
import Head from 'next/head';
import { AuthProvider } from './auth/AuthProvider';
import Nav from './Nav';

const Layout: React.FC<{ title: string; redirect?: boolean }> = (props) => {
  return (
    <>
      <Head>
        <title>{`Dunscombe Family Movies - ${props.title}`}</title>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="//vjs.zencdn.net/6.1.0/video-js.css" rel="stylesheet" />
      </Head>
      <AuthProvider redirect={props.redirect}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white pt-4">
            <div className=" border-b-2 border-gray-100">
              <Nav />
            </div>
          </div>
          {props.children}
        </div>
      </AuthProvider>
    </>
  );
};

export default Layout;
