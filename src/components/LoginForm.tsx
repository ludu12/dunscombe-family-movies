import React from 'react';
import { useAuth } from './auth/use-auth';
import { PrimaryButton } from './common/Button';

const LoginForm: React.FC = () => {
  const [answer, setAnswer] = React.useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(answer);
  };

  return (
    <div className="flex flex-col justify-center items-center my-4 flex flex-col shadow-md rounded p-4 border">
      <h1 className="text-xl">Enter pin to continue</h1>
      <form
        onSubmit={handleLogin}
        className={'flex items-center justify-between'}
      >
        <div className={'mr-1'}>
          <input
            className="shadow rounded border"
            type="password"
            name="pin"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <PrimaryButton type="submit">Go</PrimaryButton>
      </form>
    </div>
  );
};

export default LoginForm;
