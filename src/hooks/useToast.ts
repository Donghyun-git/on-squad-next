import { useToast as useLibToast } from '@/components/ui/use-toast';
import { TOAST } from '@/constants/toast';
import { useRef, ReactNode } from 'react';

export interface ToastMessageType {
  title: string;
  className: ValueOf<typeof TOAST>;
  icon?: ReactNode | ReactNode[];
}

const TOAST_TIMEOUT = 1500;

/**
 * @example
 *
 * ```tsx
 * toast({
 *    title: '합류 신청에 성공했습니다.',
 *    className: TOAST.primary,
 *    icon: <CircleX onClick={() => hide()} />,
 *  })
 * ```
 */
export const useToast = () => {
  const { toast, dismiss: libDismiss } = useLibToast();

  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const dismiss = () => {
    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current);
    }

    dismissTimeoutRef.current = setTimeout(() => {
      libDismiss();
    }, TOAST_TIMEOUT);
  };

  const show = ({ title, icon, className }: ToastMessageType) => {
    toast({
      title,
      icon,
      className,
    });

    dismiss();
  };

  return { toast: show, hide: libDismiss };
};
