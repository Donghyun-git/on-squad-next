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
import { TOAST } from '@/constants/toast';
import { useToast } from '@/hooks/useToast';

import { PATH } from '@/constants/paths';
import { CircleX } from 'lucide-react';

const LoginForm = () => {
  const router = useRouter();
  const { toast, hide } = useToast();

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
      const signInRes = await signIn('credentials', {
        redirect: false,
        redirectTo: PATH.root,
        ...getValues(),
      });

      if (signInRes?.error) {
        const errorMessage = signInRes.code;

        setDisplaySpinner(false);

        toast({
          title: errorMessage || '로그인 실패',
          className: TOAST.error,
          icon: <CircleX onClick={() => hide()} />,
        });

        return;
      }

      if (!signInRes?.ok) {
        setDisplaySpinner(false);

        toast({
          title: signInRes?.error || '로그인 실패',
          className: TOAST.error,
          icon: <CircleX onClick={() => hide()} />,
        });

        return;
      }

      setDisplaySpinner(false);

      toast({
        title: '로그인 완료',
        className: TOAST.success,
        icon: <CircleX onClick={() => hide()} />,
      });

      router.push(PATH.root);
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

        <div className="flex justify-center items-center">
          <Button
            className="w-fit text-center mt-7 text-gray-500 hover:text-gray-600 active:text-gray-700"
            variant="ghost"
            onClick={() => router.push(PATH.join)}
          >
            회원가입
          </Button>
        </div>
      </FormProvider>
    </>
  );
};

export default LoginForm;
