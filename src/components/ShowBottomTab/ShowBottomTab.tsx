"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BottomTab } from "@/components/BottomTab";

import { BOTTOMTAB_PATH } from "@/constants/paths";

const ShowBottomTab = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const pathname = usePathname();

  const isShow = [
    BOTTOMTAB_PATH.community,
    BOTTOMTAB_PATH.crews,
    BOTTOMTAB_PATH.root,
  ].includes(pathname as ValueOf<typeof BOTTOMTAB_PATH>);

  return (
    <>
      <div className="pt-20">{children}</div>
      {isShow && <BottomTab />}
    </>
  );
};

export default ShowBottomTab;
