import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getSession, Session } from '../lib/auth-cookies';
import { GetServerSideProps } from 'next';

const Home: React.FC<{ session: Session }> = () => {
  return (
    <Layout title="Home">
      <main>
        <Link href="/movies" as={`/movies`} passHref>
          <a>Go to movies</a>
        </Link>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession(req, res);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: { session } };
};
export default Home;
