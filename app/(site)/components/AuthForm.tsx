'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import { useForm, FieldValues } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const router = useRouter();
  const session = useSession();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations');
    }
  }, [session?.status, router]);

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

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          console.log('error');
          toast.error('Invalid credentialss!');
        }
        if (callback?.ok) {
          console.log('ok');
          router.push('/conversations');
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('api/register', data)
        .then(() =>
          signIn('credentials', {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!!');
          }
          if (callback?.ok) {
            router.push('/conversations');
          }
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials!');
          }
          if (callback?.ok && !callback?.error) {
            router.push('/conversations');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="sm:max-w-md sm:m-auto sm:w-full bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <Button fullWidth disabled={isLoading} type="submit">
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
        <div className="mt-6 flex gap-2">
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
