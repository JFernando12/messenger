import Image from 'next/image';
import AuthForm from './components/AuthForm';

const Auth = () => {
  return (
    <main className="flex flex-col bg-gray-100 min-h-full py-12">
      <div className="sm:max-w-md sm:m-auto sm:w-full">
        <Image
          className="mx-auto w-auto"
          alt="logo"
          src="/images/logo.png"
          height="48"
          width="48"
        />
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </main>
  );
};

export default Auth;
