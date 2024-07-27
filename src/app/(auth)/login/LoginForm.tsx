'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './validator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/Input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';

const LoginForm = () => {
  const router = useRouter();

  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);

  const method = useForm({
    resolver: yupResolver(loginSchema),
    values: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit: submit, getValues } = method;

  const handleSubmit = submit(async () => {
    setDisplaySpinner(true);

    try {
      await signIn('credentials', {
        redirect: false,
        callbackUrl: '/',
        ...getValues(),
      });

      setDisplaySpinner(false);

      alert('로그인 완료');

      router.push('/');
    } catch (error) {
      setDisplaySpinner(false);

      console.error(error);
    }
  });

  return (
    <>
      {displaySpinner ? <Spinner /> : null}
      <FormProvider {...method}>
        <form
          className="flex flex-col gap-6 items-center mt-4"
          onSubmit={handleSubmit}
        >
          <Input name="email" type="text" label="이메일" />
          <Input
            name="password"
            type="password"
            label="비밀번호"
            placeholder="12345!@asa"
          />

          <Button className="w-full" formAction="submit">
            로그인
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
