'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { joinSchema } from './validator';
import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { InputButton } from '@/components/InputButton';
import AddressSearch from './AddressSearch';

const JoinForm = () => {
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
    formState: { errors },
    clearErrors,
  } = method;

  const handleSubmit = submit(async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider {...method}>
      <form
        className="flex flex-col gap-6 items-center mt-4 mb-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center w-full gap-2">
          <Input
            name="email"
            type="text"
            label="이메일"
            placeholder="onsquad@onsquad.co.kr"
            button={
              <InputButton
                buttonText="중복확인"
                onSubmit={() => alert('이메일 중복확인')}
                color="#000"
              />
            }
          />
          <Input
            name="authCode"
            type="text"
            placeholder="인증번호 8자리"
            button={
              <InputButton
                buttonText="인증번호 확인"
                onSubmit={() => alert('인증번호 확인')}
                color="#000"
              />
            }
          />
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
          placeholder="홍길동"
          button={
            <InputButton
              buttonText="중복확인"
              color="#000"
              onSubmit={() => alert('닉네임 중복확인')}
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

        <Button className="w-full" formAction="submit">
          회원가입
        </Button>
      </form>
    </FormProvider>
  );
};

export default JoinForm;
