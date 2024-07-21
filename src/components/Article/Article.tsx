import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ArticlePropsType {
  slot: ReactNode | ReactNode[];
  className?: string;
}

const Article = ({ slot, className }: ArticlePropsType) => {
  return (
    <article className={cn(`p-6 rounded-xl bg-white ${className}`)}>
      {slot}
    </article>
  );
};

export default Article;
