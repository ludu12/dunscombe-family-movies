import { GetServerSideProps } from 'next';
import { getSession } from './auth-cookies';

export const redirectToLogin: GetServerSideProps = async (context) => {
  const { res, req } = context;
  const session = await getSession(req);
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
