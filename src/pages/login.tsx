import React from 'react';
import Layout from '../components/Layout';
import { getSession } from '../lib/auth-cookies';
import { useAuth } from '../components/auth/use-auth';
import LoginForm from '../components/LoginForm';

const Login: React.FC = (props) => {
  const { session } = props;
  const [answer, setAnswer] = React.useState('');
  const [error, setError] = React.useState(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(answer);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Layout title="Login">
      <main className="flex flex-col justify-center items-center">
        <LoginForm />
      </main>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { res, req } = context;
  const session = await getSession(req);
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
