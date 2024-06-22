'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './validator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/Input';
import { userLoginPostFetch } from '@/api/user/userLoginPostFetch';

const LoginForm = () => {
  const method = useForm({
    resolver: yupResolver(loginSchema),
    values: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit: submit, getValues } = method;

  const handleSubmit = submit(async () => {
    try {
      const loginResponse = userLoginPostFetch(getValues());

      console.log(loginResponse);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider {...method}>
      <form
        className="flex flex-col gap-6 items-center mt-4"
        onSubmit={handleSubmit}
      >
        <Input name="email" type="text" label="이메일" />
        <Input name="password" type="password" label="비밀번호" />

        <Button className="w-full" formAction="submit">
          로그인
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
