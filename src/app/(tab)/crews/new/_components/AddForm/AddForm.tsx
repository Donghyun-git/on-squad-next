'use client';

import { useState, useRef, ChangeEvent } from 'react';

import { Button } from '@/components/ui/button';

import { getQueryClient } from '@/services/get-query-client';

import { useForm, FormProvider } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { addCrewSchema } from './validator';

import { Accordion } from '@/components/Accordion';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { InputButton } from '@/components/InputButton';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/useToast';

import { TOAST } from '@/constants/toast';
import { ImagePlus, CircleX, X, Loader2 } from 'lucide-react';

import { crewCheckGetFetch } from '@/api/crew/crewCheckGetFetch';
import { ACCORDION_HASH_TAG_LIST } from '@/constants';

import { useModalStackStore } from '@/store/useModalStackStore';
import { BottomSheet } from '@/components/BottomSheet';
import { Badge } from '@/components/Badge';
import { addCrewPostFetch } from '@/api/crew/addCrewPostFetch';
import Image from 'next/image';
import { useApiMutation } from '@/services/useApiMutation';

/**
 * 크루 개설하기 작성 폼
 */
const AddForm = () => {
  const { toast, hide } = useToast();

  const setModal = useModalStackStore((state) => state.pushModal);
  const onClose = useModalStackStore((state) => state.onCloseAll);

  const [imageUrl, setImageUrl] = useState<string>('');
  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(true);

  const { mutateAsync: addCrew } = useApiMutation({
    mutationKey: ['@add-crew'],
    fetcher: addCrewPostFetch,
    invalidateKey: ['@crew-list'],
  });

  const { mutateAsync: checkCrewName } = useApiMutation({
    mutationKey: ['@check-crew-name'],
    fetcher: crewCheckGetFetch,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const method = useForm({
    resolver: yupResolver(addCrewSchema),
    defaultValues: {
      name: '',
      introduce: '',
      detail: '',
      kakaoLink: '',
      file: {} as File,
      hashtags: [],
    },
  });

  const {
    handleSubmit: submit,
    getValues,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = method;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = e.target;

    if (files && files.length > 0) {
      const uploadFile = files[0];

      setValue('file', uploadFile);

      const imageUrl = URL.createObjectURL(uploadFile);

      setImageUrl(imageUrl);
    }
  };

  const handleCrewNameCheck = async () => {
    try {
      if (!(await trigger('name'))) return;

      const { data } = await checkCrewName({
        crewName: getValues('name'),
      });

      const duplicate = data.duplicate;

      if (duplicate) {
        const crewName = getValues('name');

        toast({
          title: `${crewName}은(는) 이미 사용 중이에요.`,
          icon: <CircleX onClick={() => hide()} />,
          className: TOAST.error,
        });

        return;
      }

      setIsDuplicate(false);

      toast({
        title: '멋진 크루 이름이네요!',
        icon: <CircleX onClick={() => hide()} />,
        className: TOAST.success,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = submit(async () => {
    setDisplaySpinner(true);

    try {
      await addCrew({
        ...getValues(),
        file: getValues('file') as File,
      });

      toast({
        title: '크루 생성에 성공했어요.',
        icon: <CircleX onClick={() => hide()} />,
        className: TOAST.success,
      });

      setTimeout(() => {
        location.href = '/';
      }, 1000);
    } catch (error) {
      console.error(error);

      setDisplaySpinner(false);
    }
  });

  return (
    <FormProvider {...method}>
      <div className="container pt-14 bg-white">
        <div className="pt-12">
          <div>
            <Input
              name="name"
              type="text"
              placeholder="크루 이름을 지어주세요."
              maxLength={15}
              label="크루명"
              disabled={!isDuplicate}
              button={
                <InputButton
                  disabled={!isDuplicate}
                  buttonText="중복확인"
                  onClick={handleCrewNameCheck}
                />
              }
            />
          </div>

          <div className="mt-6">
            <Textarea
              name="introduce"
              label="크루 소개"
              placeholder="크루 소개글을 작성해주세요."
            />
          </div>

          <div className="mt-6">
            <Label className="block text-grayScale800 font-bold mb-2">
              대표이미지
            </Label>
            <div className="border border-[#f8f8f8] w-full h-40 rounded-md flex items-center justify-center">
              {watch('file') && imageUrl ? (
                <div
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }}
                  className={cn(
                    `w-full h-full object-cover bg-cover bg-center bg-no-repeat`,
                  )}
                >
                  <Image
                    className="w-full h-full object-contain rounded-md"
                    src={imageUrl}
                    alt="업로드 이미지"
                    width={100}
                    height={100}
                  />
                </div>
              ) : (
                <Button
                  className="text-grayscale500 hover:text-grayscale600 active:text-grayscale700"
                  onClick={(e) => {
                    e.preventDefault();
                    fileRef.current?.click();
                  }}
                  variant="ghost"
                >
                  <div className="flex items-center gap-2">
                    <>
                      <ImagePlus size={16} />
                      <span className="inline-block pt-0.5">
                        대표이미지 등록
                      </span>
                    </>
                  </div>
                </Button>
              )}
            </div>
            {errors?.file && (
              <p className="mt-2 text-sm text-left text-red-600">
                {errors?.file.message}
              </p>
            )}
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept=".jpeg, .jpg, .png, .svg"
              onChange={handleFileChange}
            />
          </div>

          <div className="mt-6">
            <Textarea
              name="detail"
              label="크루 상세정보"
              placeholder="크루 상세정보를 작성해주세요."
            />
          </div>

          <div className="mt-6">
            <Input
              name="hashtags"
              type="text"
              placeholder="크루를 나타내는 해시태그를 선택해주세요."
              maxLength={15}
              value=""
              disabled={true}
              label="크루명"
              button={
                <InputButton
                  buttonText="선택하기"
                  onClick={() =>
                    setModal(
                      <FormProvider {...method}>
                        <BottomSheet
                          title="크루 해시태그"
                          isOpen={true}
                          onClose={onClose}
                        >
                          <Accordion
                            name="hashtags"
                            list={ACCORDION_HASH_TAG_LIST}
                            defaultValue={['hashtag']}
                            onSubmit={(args: string[]) =>
                              setValue('hashtags', args)
                            }
                            onCancel={onClose}
                          />
                        </BottomSheet>
                      </FormProvider>,
                    )
                  }
                />
              }
            />
          </div>
          <div className="mt-3 flex gap-1 items-center flex-wrap">
            {watch('hashtags')?.map((item, index) => (
              <Badge
                key={index}
                className="flex gap-1 bg-white border border-secondary text-secondary rounded-xl cursor-pointer hover:bg-secondary/10 active:bg-secondary/20"
                onClick={() => {
                  const hashtags = getValues('hashtags');

                  const filteredHashtags = [...(hashtags ?? [])].filter(
                    (tag) => tag !== item,
                  );

                  setValue('hashtags', filteredHashtags);
                }}
              >
                <span>{item}</span>
                <X className="text-black mb-0.5" size={12} />
              </Badge>
            ))}
          </div>

          <div className="mt-6">
            <Input
              type="text"
              name="kakaoLink"
              label="크루 소통방"
              placeholder="크루 소통방 링크를 입력해주세요."
            />
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
                크루를 생성하고 있어요
              </div>
            ) : (
              '크루 개설'
            )}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddForm;
