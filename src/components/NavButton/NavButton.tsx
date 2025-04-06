import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface NavButtonPropsType extends ButtonProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

/**
 * 마이페이지, 세팅, nav 버튼
 */
const NavButton = ({ children, className, ...props }: NavButtonPropsType) => {
  return (
    <Button
      variant="outline"
      className={cn(`w-full p-3 border-0 ${className}`)}
      {...props}
    >
      <div className="w-full flex justify-between items-center">
        <span className="inline-block pt-0.5 font-medium text-black">
          {children}
        </span>
        <ChevronRight size={24} stroke="#000" strokeWidth={1.2} />
      </div>
    </Button>
  );
};

export default NavButton;
