import { ReactNode } from 'react';
import { Badge, BadgeProps } from '../ui/badge';
import { cn } from '@/lib/utils';

interface BadgePropsType extends BadgeProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

const CustomBadge = (props: BadgePropsType) => {
  const { className, children, ...rest } = props;

  return (
    <Badge
      className={cn(
        `bg-secondary rounded-md px-1.5 hover:bg-secondary active:bg-secondary font-bold ${className} `,
      )}
      {...rest}
    >
      {children}
    </Badge>
  );
};

export default CustomBadge;
