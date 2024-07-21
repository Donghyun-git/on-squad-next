'use client';

import { ReactNode } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';

interface PostButtonPropsType extends ButtonProps {
  children: ReactNode | ReactNode[];
  onPageMove: () => void;
  className?: string;
}

/**
 * 작성 버튼
 * @example
 *  <PostButton onPageMove={handlePageMove}>
 *      <PencilLine size={12} strokeWidth={2} />
 *      <Text.xxs className="ml-1 font-bold">글쓰기</Text.xxs>
 *  </PostButton>
 */
const PostButton = (props: PostButtonPropsType) => {
  const { children, className, onPageMove, ...rest } = props;

  return (
    <Button
      variant="outline"
      className={cn(`px-1 py-0.5 rounded-full h-fit ${className}`)}
      onClick={onPageMove}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default PostButton;
