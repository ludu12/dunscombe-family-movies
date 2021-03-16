import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout title="">
      <main className="">
        <Link href="/movies" as={`/movies`} passHref>
          <a>Go to movies</a>
        </Link>
      </main>
    </Layout>
  );
};

export default Home;
