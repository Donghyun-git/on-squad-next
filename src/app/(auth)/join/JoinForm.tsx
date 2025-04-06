'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { joinSchema } from './validator';
import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { InputButton } from '@/components/InputButton';
import AddressSearch from './AddressSearch';
import { userEmailCheckGetFetch } from '@/api/user/userEmailCheckGetFetch';
import { useApiMutation } from '@/services/useApiMutation';
import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';
import { CircleX, CircleCheck, Loader2 } from 'lucide-react';
import { sendEmailAuthCodePostFetch } from '@/api/user/sendEmailAuthCodePostFetch';
import { authCodeCheckGetFetch } from '@/api/user/authCodeCheckGetFetch';
import { nicknameCheckGetFetch } from '@/api/user/nicknameCheckGetFetch';
import { userJoinPostFetch } from '@/api/user/userJoinPostFetch';
const JoinForm = () => {
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isEmailAuth, setIsEmailAuth] = useState<boolean>(false);
  const [isEmailAuthSuccess, setIsEmailAuthSuccess] = useState<boolean>(false);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);

  const { toast } = useToast();

  const { mutateAsync: userJoin, isPending: isUserJoinPending } =
    useApiMutation({
      mutationKey: ['@user-join'],
      fetcher: userJoinPostFetch,
      options: {
        onSuccess: (data) => {
          if (data.status === 201) {
            toast({
              title: '회원가입에 성공했어요.',
              className: TOAST.success,
              icon: <CircleCheck />,
            });
          } else {
            toast({
              title: '회원가입에 실패했어요.',
              className: TOAST.error,
              icon: <CircleX />,
            });
          }
        },
      },
    });

  const { mutateAsync: nicknameCheck } = useApiMutation({
    mutationKey: ['@nickname-check'],
    fetcher: nicknameCheckGetFetch,
    options: {
      onSuccess: (data) => {
        if (!data.data.duplicate) {
          setIsNicknameValid(true);

          toast({
            title: '사용 가능한 닉네임 이에요!',
            className: TOAST.success,
            icon: <CircleCheck />,
          });
        } else {
          toast({
            title: '이미 사용 중인 닉네임이에요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const { mutateAsync: emailCheck } = useApiMutation({
    mutationKey: ['@email-check'],
    fetcher: userEmailCheckGetFetch,
    options: {
      onSuccess: (data) => {
        if (!data.data.duplicate) {
          setIsEmailValid(true);

          toast({
            title: '사용 가능한 이메일 이에요!',
            className: TOAST.success,
            icon: <CircleCheck />,
          });
        } else {
          toast({
            title: '이미 사용 중인 이메일이에요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const { mutateAsync: sendEmailAuthCode } = useApiMutation({
    mutationKey: ['@send-email-auth-code'],
    fetcher: sendEmailAuthCodePostFetch,
    options: {
      onSuccess: (data) => {
        if (data.status === 204) {
          setIsEmailAuth(true);

          toast({
            title: `${getValues('email')}로 인증번호를 전송했어요.`,
            className: TOAST.success,
            icon: <CircleCheck />,
          });
        } else {
          toast({
            title: '인증번호 전송에 실패했어요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const { mutateAsync: authCodeCheck } = useApiMutation({
    mutationKey: ['@auth-code-check'],
    fetcher: authCodeCheckGetFetch,
    options: {
      onSuccess: (data) => {
        if (data.data.valid) {
          setIsEmailAuthSuccess(true);

          toast({
            title: '인증번호 확인에 성공했어요.',
            className: TOAST.success,
            icon: <CircleCheck />,
          });
        } else {
          toast({
            title: '인증번호 확인에 실패했어요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const method = useForm({
    resolver: yupResolver(joinSchema),
    values: {
      email: '',
      authCode: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      address: '',
      addressDetail: '',
    },
  });

  const {
    handleSubmit: submit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
    clearErrors,
  } = method;

  const handleSubmit = submit(async () => {
    try {
      await userJoin({
        ...getValues(),
      });
    } catch (error) {
      console.error(error);
    }
  });

  const handleEmailCheck = async () => {
    try {
      const res = await emailCheck({ email: getValues('email') });

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuthCodeSend = async () => {
    try {
      const res = await sendEmailAuthCode({
        email: getValues('email'),
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...method}>
      <form
        className="flex flex-col gap-6 items-center mt-4 pb-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center w-full gap-2">
          <Input
            name="email"
            type="text"
            label="이메일"
            placeholder="onsquad@onsquad.co.kr"
            disabled={isEmailValid}
            button={
              <>
                {!isEmailValid ? (
                  <InputButton
                    buttonText="중복확인"
                    onClick={async () => {
                      if (!(await trigger('email'))) return;

                      handleEmailCheck();
                    }}
                  />
                ) : !isEmailAuth || !isEmailAuthSuccess ? (
                  <InputButton
                    buttonText={isEmailAuth ? '재전송하기' : '이메일 인증'}
                    onClick={handleAuthCodeSend}
                  />
                ) : null}
              </>
            }
          />
          {isEmailAuth ? (
            <Input
              name="authCode"
              type="text"
              placeholder="인증번호 8자리"
              disabled={isEmailAuthSuccess}
              button={
                <InputButton
                  buttonText={isEmailAuthSuccess ? '인증완료' : '인증번호 확인'}
                  disabled={isEmailAuthSuccess}
                  onClick={async () => {
                    if (!(await trigger('authCode'))) return;

                    authCodeCheck({
                      email: getValues('email'),
                      authCode: getValues('authCode'),
                    });
                  }}
                />
              }
            />
          ) : null}
        </div>

        <Input
          name="password"
          type="password"
          label="비밀번호"
          placeholder="영문, 숫자, 특수문자 1자를 포함"
        />

        <Input
          name="passwordConfirm"
          type="password"
          label="비밀번호 확인"
          placeholder="영문, 숫자, 특수문자 1자를 포함"
        />

        <Input
          name="nickname"
          type="text"
          label="닉네임"
          maxLength={8}
          placeholder="홍길동"
          button={
            <InputButton
              buttonText="중복확인"
              onClick={async () => {
                if (!(await trigger('nickname'))) return;

                nicknameCheck({ nickname: getValues('nickname') });
              }}
            />
          }
        />

        <div className="flex flex-col items-center w-full gap-2">
          <AddressSearch
            name="address"
            onAddressChange={(addr) => {
              setValue('address', addr);

              if (errors?.address) {
                clearErrors('address');

                return;
              }
            }}
          />
          <Input name="addressDetail" type="text" />
        </div>

        <Button
          className="w-full"
          formAction="submit"
          disabled={isUserJoinPending}
        >
          {isUserJoinPending ? (
            <div className="flex items-center gap-1 justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              회원가입 중이에요 ...
            </div>
          ) : (
            '회원가입'
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default JoinForm;
