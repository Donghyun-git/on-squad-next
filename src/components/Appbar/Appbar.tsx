'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, Plus, Text as TextIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { userSocialLoginGetFetch } from '@/api/user/userSocialLoginGetFetch';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NavButton } from '@/components/NavButton';
import { Text } from '../Text';
import { Profile } from '../Profile';

import { PATH } from '@/constants/paths';
import { useRouter, useSearchParams } from 'next/navigation';
import { useModalStackStore } from '@/store/useModalStackStore';

import { CountLabel } from '../CountLabel';
import { USER_TYPE } from '@/constants';

export interface AppbarPropsType {
  isMenuHeader?: boolean;
  title?: string;
}

//TODO: 뭔가 서버컴포넌트여야할 것 같아요....
const Appbar = ({ isMenuHeader = true, title }: AppbarPropsType) => {
  const { data: session } = useSession();

  const modalStack = useModalStackStore((state) => state.modalStack);
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken) {
      (async () => {
        try {
          await signIn('kakao', {
            redirect: false,
            callbackUrl: PATH.root,
            accessToken,
            refreshToken,
          });

          router.replace(PATH.root);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [searchParams, router]);

  if (!isMenuHeader) {
    return (
      <div
        className={cn(
          'fixed left-1/2 transform -translate-x-1/2 w-full min-w-[20rem] max-w-[45rem] top-0 flex items-center justify-between z-[100] shadow-md-bottom',
          modalStack.length > 0 ? 'bg-gray50 shadow-none' : 'bg-white',
        )}
      >
        <div
          className="flex items-center w-20 h-14 ml-4 cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft color="#636363" strokeWidth={1.25} />
        </div>
        <h3 className="font-bold">{title}</h3>
        <div className="w-20 mr-4"></div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        `fixed left-1/2 transform -translate-x-1/2 w-full min-w-[20rem] max-w-[45rem] top-0 flex items-center justify-between z-[100] ${
          !isOpen && 'shadow-md-bottom'
        } ${modalStack.length > 0 ? 'bg-gray50 shadow-none' : 'bg-white'}`,
      )}
    >
      <Link className="relative w-20 h-20 ml-4" href={PATH.root}>
        <Image src="/icons/onsquad_logo.svg" alt="온스쿼드" fill priority />
      </Link>

      <div className="flex items-center gap-2 relative mr-4">
        {session ? (
          <Button
            variant="outline"
            className={cn(
              `h-fit p-2 flex items-center gap-0.5 ${
                modalStack.length > 0 ? 'bg-gray50' : 'bg-white'
              }`,
            )}
          >
            <Link href="/crews/new">
              <Text.xs>크루 개설하기</Text.xs>
            </Link>
            <Plus className="mb-0.5" size={8} strokeWidth={2} />
          </Button>
        ) : null}

        <Sheet onOpenChange={(value) => setIsOpen(value)}>
          <SheetOverlay />
          <SheetTrigger asChild>
            <TextIcon
              color="#636363"
              strokeWidth={1.5}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="bg-grayscale100 top-20 rounded-tl-2xl focus-visible:border-0 focus-visible:outline-0 overflow-y-auto no-scroll-bar">
            <SheetTitle className="mt-5">
              <Profile session={session} />
            </SheetTitle>
            {!session ? (
              <>
                <Separator className="my-6" />

                <div className="flex items-center mb-4">
                  <SheetDescription className="w-full text-center">
                    소셜계정 혹은 이메일로 로그인하기
                  </SheetDescription>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <SheetClose asChild>
                    <Link
                      className="w-full focus-visible:outline-none"
                      href={PATH.login}
                    >
                      <Button
                        className="w-full font-semibold"
                        variant="outline"
                      >
                        이메일로 로그인 하기
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="w-full gap-2 text-semibold bg-kakao hover:bg-kakao-hover active:bg-kakao-hover text-kakao-text focus-visible:outline-kakao"
                      onClick={async () => {
                        try {
                          const kakaoLoginRes = await userSocialLoginGetFetch({
                            platform: 'kakao',
                          });

                          console.log(kakaoLoginRes, '카카오 로그인 응답');

                          location.href = kakaoLoginRes.headers.location;
                        } catch (error) {
                          console.error('카카오 로그인 실패', error);
                        }
                      }}
                    >
                      <Image
                        src="/icons/kakaologo.svg"
                        alt="카카오로고"
                        width={20}
                        height={20}
                        priority
                      />
                      카카오로 로그인하기
                    </Button>
                  </SheetClose>
                </div>
                <div className="flex flex-col gap-2 mt-8 items-center text-gray-700">
                  아직 회원이 아니신가요?
                  <Link className="underline text-blue-500" href={PATH.join}>
                    회원가입
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-col">
                <div className="flex flex-col items-center justify-center gap-2 mt-6">
                  <SheetClose asChild>
                    <NavButton>프로필편집</NavButton>
                  </SheetClose>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col flex-grow">
                  <ul className="flex flex-col">
                    <li>
                      <SheetDescription className="w-full mb-3">
                        계정정보
                      </SheetDescription>
                      <div className="px-3 py-2 text-grayscale700">
                        {session.email}
                      </div>
                      {session.userType === USER_TYPE.general && (
                        <NavButton>비밀번호 변경</NavButton>
                      )}
                    </li>
                    <li>
                      <Separator className="mt-6 mb-3" />
                    </li>
                    <li className="mt-3">
                      <SheetDescription className="w-full mb-3">
                        내 활동
                      </SheetDescription>
                      <div className="flex flex-col gap-2">
                        <NavButton>
                          <div className="flex gap-2 items-center">
                            <span>내 크루</span>
                            <CountLabel count={12} />
                          </div>
                        </NavButton>
                        <NavButton>
                          <div className="flex gap-2 items-center">
                            <span>합류신청</span>
                            <CountLabel count={12} />
                          </div>
                        </NavButton>
                        <NavButton>
                          <div className="flex gap-2 items-center">
                            <span>활동내역</span>
                            <CountLabel count={12} />
                          </div>
                        </NavButton>
                      </div>
                    </li>
                    <li>
                      <Separator className="my-6" />
                    </li>
                    <li className="text-center text-grayscale500 font-semibold">
                      <p className="text-center">최신 버전입니다.</p>
                      <p className="text-center">app ver 1.0.0</p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Appbar;
