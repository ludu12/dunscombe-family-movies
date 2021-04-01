import React from 'react';
import Layout from '../components/Layout';
import { getSession } from '../lib/auth-cookies';
import LoginForm from '../components/LoginForm';
import { GetServerSideProps } from 'next';

const Login: React.FC = () => {
  return (
    <Layout title="Login">
      <main className="flex flex-col justify-center items-center">
        <LoginForm />
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession(req, res);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { session: null } };
};
export default Login;
