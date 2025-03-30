'use client';

import { FallbackProps } from 'react-error-boundary';
import { Alert } from '@/components/Alert';

import { BUTTON } from '@/components/Alert/style';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ResponseModel } from '@/api/model';
import { useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';

// 싱글톤 인스턴스를 추적하기 위한 전역 변수
let isErrorFallbackMounted = false;

interface ErrorFallbackProps extends FallbackProps {}

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const router = useRouter();
  const hasHandledRef = useRef(false);
  const isNavigatingRef = useRef(false);

  // 이미 마운트된 인스턴스가 있으면 null 반환
  useEffect(() => {
    if (isErrorFallbackMounted) {
      return;
    }

    isErrorFallbackMounted = true;

    return () => {
      isErrorFallbackMounted = false;
    };
  }, []);

  // 이미 마운트된 인스턴스가 있으면 아무것도 렌더링하지 않음
  if (isErrorFallbackMounted && !hasHandledRef.current) {
    return null;
  }

  const handleNavigation = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    resetErrorBoundary();

    router.back();

    setTimeout(() => {
      location.reload();
    }, 0);
  };

  return (
    <Alert
      title="알림"
      headerClassName="pt-6"
      buttonSlot={
        <div className="w-full">
          <Button
            className={cn(BUTTON.ACTION, 'rounded-bl-md w-full')}
            onClick={handleNavigation}
            disabled={isNavigatingRef.current}
          >
            확인
          </Button>
        </div>
      }
    >
      {
        (error as Required<NonNullable<PropType<ResponseModel, 'error'>>>)
          .message
      }
    </Alert>
  );
}
