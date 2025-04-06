'use client';

import {
  useState,
  useRef,
  ChangeEvent,
  useLayoutEffect,
  useEffect,
} from 'react';

import { Button } from '@/components/ui/button';

import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { InputButton } from '@/components/InputButton';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/useToast';

import { TOAST } from '@/constants/toast';
import { CircleX, Loader2, CircleCheck, Camera } from 'lucide-react';
import { Select } from '@/components/Select';

import { MBTI_SELECT_OPTIONS } from '@/constants';

import { useModalStackStore } from '@/store/useModalStackStore';
import Image from 'next/image';
import { useApiMutation } from '@/services/useApiMutation';
import { useSession } from 'next-auth/react';
import { Alert } from '@/components/Alert';
import { BUTTON } from '@/components/Alert/style';
import { profileSchema } from './validator';
import { nicknameCheckGetFetch } from '@/api/user/nicknameCheckGetFetch';
import AddressSearch from '../join/AddressSearch';
import { Spinner } from '@/components/Spinner';

//TODO: 이미지 업데이트, aws s3 sdk, 정보 업데이트 분리

/**
 * 프로필 페이지
 */
const ProfileForm = () => {
  const { toast, hide } = useToast();
  const router = useRouter();
  const setModal = useModalStackStore((state) => state.pushModal);
  const onClose = useModalStackStore((state) => state.onCloseAll);

  const session = useSession();

  const [imageUrl, setImageUrl] = useState<string>('');
  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(true);

  const fileRef = useRef<HTMLInputElement>(null);

  const method = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      nickname: '',
      introduce: '',
      kakaoLink: '',
      profileImage: '/icons/default_profile.svg',
      mbti: '',
      address: '',
      addressDetail: '',
    },
  });

  const {
    handleSubmit: submit,
    getValues,
    watch,
    setValue,
    clearErrors,
    trigger,
    reset,
    formState: { errors },
  } = method;

  const { mutateAsync: nicknameCheck } = useApiMutation({
    mutationKey: ['@nickname-check'],
    fetcher: nicknameCheckGetFetch,
    options: {
      onSuccess: (data) => {
        if (!data.data.duplicate) {
          toast({
            title: '사용 가능한 닉네임 이에요!',
            className: TOAST.success,
            icon: <CircleCheck />,
          });
        } else {
          toast({
            title: '이미 사용 중인 닉네임이에요.',
            className: TOAST.error,
            icon: <CircleX />,
          });
        }
      },
    },
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = e.target;

    if (files && files.length > 0) {
      const uploadFile = files[0];

      setValue('profileImage', uploadFile);

      const imageUrl = URL.createObjectURL(uploadFile);

      setImageUrl(imageUrl);
    }
  };

  const handleSubmit = submit(async () => {
    setDisplaySpinner(true);

    try {
    } catch (error) {
      console.error(error);

      setDisplaySpinner(false);
    }
  });

  useLayoutEffect(() => {
    const body = document.body;

    body.style.backgroundColor = '#f8f8f8';

    return () => {
      body.style.backgroundColor = '';
    };
  }, []);

  console.log(session.data);
  useEffect(() => {
    if (session.status === 'authenticated' && session.data) {
      reset({
        nickname: session.data.nickname,
        introduce: session.data.introduce,
        profileImage: session.data.profileImage || '/icons/default_profile.svg',
        mbti: session.data.mbti,
        address: session.data.address,
        addressDetail: session.data.addressDetail,
        kakaoLink: session.data.kakaoLink,
      });
    }
  }, [session.status, session.data]);

  const profileImage = watch('profileImage');

  if (!session) {
    return (
      <Alert
        title="알림"
        headerClassName="pt-6"
        buttonSlot={
          <div className="w-full">
            <Button
              className={cn(BUTTON.ACTION, 'rounded-bl-md w-full')}
              onClick={() => router.back()}
            >
              확인
            </Button>
          </div>
        }
      >
        로그인 후 이용해주세요!
      </Alert>
    );
  }

  if (session.status === 'loading') {
    return (
      <div className="container pt-6 bg-grayscale100 flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <FormProvider {...method}>
      <div className="container pt-20 bg-grayscale100">
        <div className="pt-12">
          <div className="flex items-center gap-2 w-full justify-center mb-12">
            <div className="relative border w-24 h-24 border-[#f8f8f8] rounded-3xl flex items-center justify-center">
              <div
                className={cn(
                  `w-full h-full object-cover cursor-pointer rounded-3xl overflow-hidden`,
                )}
                onClick={() => {
                  fileRef.current?.click();
                }}
              >
                <Image
                  src={profileImage}
                  alt="profile"
                  fill
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="flex items-center gap-2 absolute bottom-0 right-0 p-1 rounded-full bg-white border border-grayscale300">
                  <Camera size={12} stroke="#909090" />
                </div>
              </div>
            </div>
          </div>

          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept=".jpeg, .jpg, .png, .svg"
            onChange={handleFileChange}
          />

          <div>
            <Input
              name="nickname"
              type="text"
              label="닉네임"
              maxLength={8}
              placeholder={session?.data?.nickname}
              button={
                <InputButton
                  buttonText="중복확인"
                  onClick={async () => {
                    if (!(await trigger('nickname'))) return;

                    nicknameCheck({ nickname: getValues('nickname') });
                  }}
                />
              }
            />
          </div>

          <div className="mt-6">
            <Textarea
              name="introduce"
              label="나의 소개"
              placeholder="나의 소개글을 작성해주세요."
            />
          </div>

          <div className="mt-6">
            <Select name="mbti" label="MBTI" options={MBTI_SELECT_OPTIONS} />
          </div>

          <div className="mt-6">
            <Input
              type="text"
              className="w-full"
              name="kakaoLink"
              label="오픈 카톡 프로필"
              placeholder="오픈 카톡 프로필 링크를 입력해주세요."
            />
          </div>

          <div className="flex flex-col items-center w-full gap-2 mt-6">
            <AddressSearch
              name="address"
              onAddressChange={(addr) => {
                setValue('address', addr);

                if (errors?.address) {
                  clearErrors('address');

                  return;
                }
              }}
            />
            <Input name="addressDetail" type="text" />
          </div>
        </div>

        <div className="buttonArea mt-36 mb-12">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={displaySpinner}
          >
            {displaySpinner ? (
              <div className="flex items-center gap-1 justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                프로필을 수정하고 있어요
              </div>
            ) : (
              '프로필 수정'
            )}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default ProfileForm;
