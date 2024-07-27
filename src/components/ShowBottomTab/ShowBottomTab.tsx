'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { BottomTab } from '@/components/BottomTab';

import { BOTTOMTAB_PATH } from '@/constants/paths';
import { Appbar } from '../Appbar';

const ShowBottomTab = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const pathname = usePathname();

  const isShow = [
    BOTTOMTAB_PATH.community,
    BOTTOMTAB_PATH.crews,
    BOTTOMTAB_PATH.root,
  ].includes(pathname as ValueOf<typeof BOTTOMTAB_PATH>);

  return (
    <SessionProvider>
      <Appbar />
      <div className="pt-20 bg-gray-50 min-h-[calc(100dvh-5rem)]">
        {children}
      </div>
      {isShow && <BottomTab />}
      <div className="min-w-[20rem] max-w-[45rem] h-20 mx-auto bg-gray-50" />
    </SessionProvider>
  );
};

export default ShowBottomTab;
