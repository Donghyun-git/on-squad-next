"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { TAB_MENUS } from "@/constants/tabs";

const BottomTab = () => {
  const pathname = usePathname();

  return (
    <div className="min-w-[20rem] max-w-[67.5rem] mx-auto flex fixed bottom-0 left-0 right-0 bg-white shadow-md z-10">
      {TAB_MENUS.map((item) => {
        const { location, ...rest } = item;

        const isActive = pathname === location;

        return (
          <Link
            key={item.location}
            href={item.location}
            className={cn(
              `relative flex-grow text-center py-3 no-underline text-black w-[33%] flex justify-center items-center flex-col gap-1 ${
                isActive && "bg-orange-500 rounded-md"
              }`
            )}
          >
            <Image
              src={isActive ? rest.active : rest.inActive}
              alt={rest.alt}
              width={20}
              height={20}
              priority
              style={{ width: "auto", height: "auto" }}
            />

            <span
              className={cn(
                `text-[0.78rem] ${isActive ? "text-white" : "text-gray-400"}`
              )}
            >
              {rest.menu}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomTab;
