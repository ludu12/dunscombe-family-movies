import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
