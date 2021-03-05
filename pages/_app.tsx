import React from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                <title>Dunscombe Family Movies</title>
                <meta content="IE=edge" httpEquiv="X-UA-Compatible"/>
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
                <link href="//vjs.zencdn.net/6.1.0/video-js.css" rel="stylesheet"/>
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default App;
