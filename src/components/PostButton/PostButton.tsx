'use client';

import { forwardRef } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';

interface PostButtonPropsType extends ButtonProps {
  onPageMove: () => void;
}

/**
 * 작성 버튼
 * -----
 * @example
 *  <PostButton onPageMove={handlePageMove}>
 *      <PencilLine size={12} strokeWidth={2} />
 *      <Text.xxs className="ml-1 font-bold">글쓰기</Text.xxs>
 *  </PostButton>
 */
const PostButton = forwardRef<HTMLButtonElement, PostButtonPropsType>(
  (props, ref) => {
    const { children, className, onPageMove, ...rest } = props;

    return (
      <Button
        ref={ref}
        variant="outline"
        className={cn(
          `px-1 py-0.5 rounded-full h-fit bg-white border-0 ${className}`,
        )}
        onClick={onPageMove}
        {...rest}
      >
        {children}
      </Button>
    );
  },
);

PostButton.displayName = 'PostButton';

export default PostButton;
