import { ReactNode } from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';

export interface AlertPropsType {
  title: string;
  children: ReactNode | ReactNode[];
  buttonSlot: ReactNode | ReactNode[];
}

/**
 * Alert 공통컴포넌트 
 * - RCC에서만 사용
 * @example
 * setModal(
      <Alert
        title="로그인이 필요한 서비스에요."
        buttonSlot={
          <>
            <Button className={BUTTON.CANCEL}>이전으로</Button>
            <Button className={BUTTON.ACTION}>로그인</Button>
          </>
        }
      >
        <div className="flex flex-col gap-2">
          <span className="text-grayscale700 text-lg font-semibold">
            로그인 후 다시 시도해주세요.
          </span>
          <div className="flex items-center gap-2 justify-center text-sm">
            <span className="text-grayscale700">
              아직 회원이 아니신가요?
            </span>
            <span
              className="cursor-pointer underline text-blue400"
              onClick={() => {
                onClose();

                router.push(PATH.join);
              }}
            >
              회원가입
            </span>
          </div>
        </div>
      </Alert>,
    );
 */
const Alert = (props: AlertPropsType) => {
  const { title, children, buttonSlot } = props;

  return (
    <AlertDialog open={true}>
      <AlertDialogOverlay />
      <AlertDialogContent className="p-0">
        <AlertDialogHeader className="pt-9 px-4">
          <AlertDialogTitle className="text-center text-grayscale900 text-xl">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="hidden" />
        </AlertDialogHeader>
        <div className="px-4 pb-4 text-center">{children}</div>
        <AlertDialogFooter className="px-0 grid grid-cols-1 w-full">
          <div className="-mx-[0.075rem] -mb-[0.075rem]">{buttonSlot}</div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
