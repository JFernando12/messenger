'use client';
import React, { useState } from 'react';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { signIn } from 'next-auth/react';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const toggleVariant = () => {
    setVariant((prev) => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  };

  const socialAction = (action: 'github' | 'google') => {
    setIsLoading(true);
    signgn;
    setIsLoading(false);
  };

  return (
    <div className="sm:max-w-md sm:m-auto sm:w-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      <form action="" className="space-y-6">
        {variant === 'REGISTER' && (
          <Input
            label="Name"
            type="text"
            id="name"
            register={register}
            errors={errors}
            required
          />
        )}
        <Input
          label="Email address"
          type="email"
          id="email"
          register={register}
          errors={errors}
          required
        />
        <Input
          label="Password"
          type="password"
          id="password"
          register={register}
          errors={errors}
          required
        />
        <Button fullWidth>
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
      </form>
      <div className="mt-6">
        {/* Linea divisoria con texto */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="border-t w-full" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white text-gray-500 px-2 text-sm">
              Or continue with
            </span>
          </div>
        </div>
        {/* Botones de redes sociales */}
        <div className="">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction('github')}
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction('google')}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div>
          {variant === 'LOGIN'
            ? 'New to Messenger?'
            : 'Already have an account?'}
        </div>
        <div onClick={toggleVariant} className="underline cursor-pointer">
          {variant === 'LOGIN' ? 'Create and account' : 'Login'}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
