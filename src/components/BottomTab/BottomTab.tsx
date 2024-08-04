'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useModalStackStore } from '@/store/useModalStackStore';
import { Alert } from '../Alert';

import { cn } from '@/lib/utils';
import { TAB_MENUS } from '@/constants/tabs';
import { Button } from '../ui/button';
import { BUTTON } from '../Alert/style';
import { PATH } from '@/constants/paths';

const BottomTab = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const setModal = useModalStackStore((state) => state.pushModal);
  const onClose = useModalStackStore((state) => state.popModal);

  return (
    <div className="min-w-[20rem] max-w-[45rem] mx-auto flex fixed bottom-0 left-0 right-0 bg-white shadow-md z-10">
      {TAB_MENUS.map((item) => {
        const { location, ...rest } = item;

        const isActive = pathname === location;

        if (!session && location === '/crews') {
          return (
            <div
              key={item.location}
              className={cn(
                `cursor-pointer relative flex-grow text-center py-3 no-underline text-black w-[33%] flex justify-center items-center flex-col gap-1 ${
                  isActive && 'bg-orange-500 rounded-md'
                }`,
              )}
              onClick={() =>
                !session && location === PATH.crews
                  ? setModal(
                      <Alert
                        title="로그인이 필요한 서비스에요."
                        buttonSlot={
                          <div className="grid grid-cols-2">
                            <Button className={BUTTON.CANCEL} onClick={onClose}>
                              이전으로
                            </Button>
                            <Button
                              className={BUTTON.ACTION}
                              onClick={() => {
                                onClose();

                                window.location.href = PATH.login;
                              }}
                            >
                              로그인
                            </Button>
                          </div>
                        }
                      >
                        <div className="flex flex-col gap-2">
                          <span className="text-grayscale700 text-lg font-semibold">
                            로그인 후 다시 시도해주세요.
                          </span>
                          <div className="flex items-center gap-2 justify-center text-sm">
                            <span className="text-grayscale700">
                              아직 회원이 아니신가요?
                            </span>
                            <span
                              className="cursor-pointer underline text-blue400"
                              onClick={() => {
                                onClose();

                                window.location.href = PATH.join;
                              }}
                            >
                              회원가입
                            </span>
                          </div>
                        </div>
                      </Alert>,
                    )
                  : null
              }
            >
              <Image
                src={isActive ? rest.active : rest.inActive}
                alt={rest.alt}
                width={20}
                height={20}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />

              <span
                className={cn(
                  `text-[0.78rem] ${isActive ? 'text-white' : 'text-gray-400'}`,
                )}
              >
                {rest.menu}
              </span>
            </div>
          );
        } else {
          return (
            <Link
              key={item.location}
              href={item.location}
              className={cn(
                `cursor-pointer relative flex-grow text-center py-3 no-underline text-black w-[33%] flex justify-center items-center flex-col gap-1 ${
                  isActive && 'bg-orange-500 rounded-md'
                }`,
              )}
            >
              <Image
                src={isActive ? rest.active : rest.inActive}
                alt={rest.alt}
                width={20}
                height={20}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />

              <span
                className={cn(
                  `text-[0.78rem] ${isActive ? 'text-white' : 'text-gray-400'}`,
                )}
              >
                {rest.menu}
              </span>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default BottomTab;
