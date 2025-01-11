'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { BottomTab } from '@/components/BottomTab';

import { BOTTOMTAB_PATH } from '@/constants/paths';

const ShowBottomTab = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const pathname = usePathname();

  const isShow = [
    BOTTOMTAB_PATH.community,
    BOTTOMTAB_PATH.crews,
    BOTTOMTAB_PATH.root,
  ].includes(pathname as ValueOf<typeof BOTTOMTAB_PATH>);

  // min-h-[calc(100dvh-5rem)]

  return (
    <>
      <div className="bg-gray-50 ">{children}</div>
      {isShow && (
        <>
          <BottomTab />
          {/* <div className="bg-white h-8 fixed bottom-0 z-10 w-full" /> */}
          <div className="min-w-[20rem] max-w-[45rem] h-20 mx-auto bg-gray-50" />
        </>
      )}
    </>
  );
};

export default ShowBottomTab;
