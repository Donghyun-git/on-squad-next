'use client';

import React, { useMemo, useLayoutEffect } from 'react';

import { useForm, useWatch, FormProvider } from 'react-hook-form';
import { changePasswordSchema } from './validator';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/paths';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';
import { CircleX, CircleCheck, Loader2 } from 'lucide-react';
import { useApiMutation } from '@/services/useApiMutation';
import { changePasswordPatchFetch } from '@/api/user/changePasswordPatchFetch';

const ChangePasswordForm = () => {
  const method = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit: submit,
    getValues,
    control,
    formState: { errors },
  } = method;

  const [currentPassword, newPassword, newPasswordConfirm] = useWatch({
    control,
    name: ['currentPassword', 'newPassword', 'newPasswordConfirm'],
  });

  const isEmpty = useMemo(() => {
    return !currentPassword || !newPassword || !newPasswordConfirm;
  }, [currentPassword, newPassword, newPasswordConfirm]);

  const isError =
    errors.currentPassword || errors.newPassword || errors.newPasswordConfirm;

  const router = useRouter();

  const { toast } = useToast();

  const { mutateAsync: changePassword, isPending } = useApiMutation({
    mutationKey: ['@change-password'],
    fetcher: changePasswordPatchFetch,
    options: {
      onSuccess: (data) => {
        if (data.status === 204) {
          toast({
            title: '비밀번호 변경에 성공했어요.',
            className: TOAST.success,
            icon: <CircleCheck />,
          });

          router.push(PATH.root);
        } else {
          toast({
            title: '비밀번호 변경에 실패했어요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const handleSubmit = submit(async () => {
    await changePassword(getValues());
  });

  useLayoutEffect(() => {
    const body = document.body;

    body.style.backgroundColor = '#f8f8f8';

    return () => {
      body.style.backgroundColor = '';
    };
  }, []);

  return (
    <FormProvider {...method}>
      <form
        className="flex flex-col gap-6 items-center mt-4"
        onSubmit={handleSubmit}
      >
        <Input
          name="currentPassword"
          type="password"
          label="현재 비밀번호"
          placeholder="현재 비밀번호"
        />

        <Input
          name="newPassword"
          type="password"
          label="새로운 비밀번호"
          placeholder="새로운 비밀번호"
        />

        <Input
          name="newPasswordConfirm"
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
        />

        <Button
          className="w-full disabled:bg-grayscale200 disabled:text-grayscale600 disabled:cursor-not-allowed"
          formAction="submit"
          disabled={
            isPending || isEmpty || isError === undefined ? false : true
          }
        >
          {isPending ? (
            <div className="flex items-center gap-1 justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              변경 사항을 저장 중이에요 ...
            </div>
          ) : (
            '저장하기'
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
