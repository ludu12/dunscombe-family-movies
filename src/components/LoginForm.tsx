import React from 'react';
import { useAuth } from '../components/auth/use-auth';

const LoginForm: React.FC = () => {
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
    <div className="flex flex-col justify-center items-center my-4 flex flex-col shadow-md rounded p-4 border">
      <h1 className="text-xl">Enter pin to continue</h1>
      <input
        className="shadow rounded border"
        type="password"
        name="pin"
        value={answer}
        onKeyDown={(e) => {
          if (!e.repeat && e.key === 'Enter') {
            handleLogin();
          }
        }}
        onChange={(e) => setAnswer(e.target.value)}
      />
    </div>
  );
};

export default LoginForm;
