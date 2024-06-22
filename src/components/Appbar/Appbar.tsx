'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, Text } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { HEADER_TEXT } from '@/constants';

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
import Link from 'next/link';
import { PATH } from '@/constants/paths';
import { Profile } from '../Profile';

const Appbar = () => {
  const pathname = usePathname();
  const headerTitle =
    HEADER_TEXT.find((item) => item.path === pathname)?.title ?? '';

  if (headerTitle !== '') {
    return (
      <div className="fixed left-1/2 transform -translate-x-1/2 w-full min-w-[20rem] max-w-[67.5rem] flex items-center justify-between bg-white z-[100] shadow-md">
        <Link className="flex items-center w-20 h-14 ml-4" href={PATH.root}>
          <ChevronLeft color="#636363" strokeWidth={1.25} />
        </Link>
        <h3 className="font-bold">{headerTitle}</h3>
        <div className="w-20 mr-4"></div>
      </div>
    );
  }
  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 w-full min-w-[20rem] max-w-[67.5rem] flex items-center justify-between bg-white z-[100]">
      <Link className="relative w-20 h-20 ml-4" href={PATH.root}>
        <Image src="/icons/onsquad_logo.svg" alt="온스쿼드" fill priority />
      </Link>

      <div className="relative mr-4">
        <Sheet>
          <SheetOverlay />
          <SheetTrigger asChild>
            <Text
              color="#636363"
              strokeWidth={1.5}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className=" top-20 rounded-tl-2xl">
            <SheetTitle className="mt-5">
              <Profile />
            </SheetTitle>
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
                  <Button className="w-full font-semibold" variant="outline">
                    이메일로 로그인 하기
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  className="w-full focus-visible:outline-none"
                  href="/kakao/callback"
                >
                  <Button className="w-full gap-2 text-semibold bg-kakao hover:bg-kakao-hover active:bg-kakao-hover text-kakao-text focus-visible:outline-kakao">
                    <Image
                      src="/icons/kakaologo.svg"
                      alt="카카오로고"
                      width={20}
                      height={20}
                      priority
                    />
                    카카오로 로그인하기
                  </Button>
                </Link>
              </SheetClose>
            </div>
            <div className="flex flex-col gap-2 mt-8 items-center text-gray-700">
              아직 회원이 아니신가요?
              <Link className="underline text-blue-500" href={PATH.join}>
                회원가입
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Appbar;
