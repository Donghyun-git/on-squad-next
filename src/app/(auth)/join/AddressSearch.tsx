'use client';

import { useRef } from 'react';
import {
  Controller,
  useFormContext,
  Path,
  FieldValues,
  FormProvider,
} from 'react-hook-form';

import { Input } from '@/components/Input';
import { JoinSchemaType } from './validator';
import { InputButton } from '@/components/InputButton';
import Image from 'next/image';
interface AddressSearchProps<T extends FieldValues> {
  name: Path<T>;
  onAddressChange: (address: string) => void;
}

const AddressSearch = <T extends FieldValues>(props: AddressSearchProps<T>) => {
  const { name, onAddressChange } = props;
  const method = useFormContext<JoinSchemaType>();

  const { control } = method;

  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const foldDaumPostcode = () => {
    if (!wrapRef.current) return;

    wrapRef.current.style.display = 'none';
  };

  const execDaumPostcode = () => {
    const currentScroll = Math.max(
      document.body.scrollTop,
      document.documentElement.scrollTop,
    );

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        let addr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (wrapRef.current) {
          wrapRef.current.style.display = 'none';
        }

        document.body.scrollTop = currentScroll;

        onAddressChange(addr);
      },

      onresize: (size: { height: number }) => {
        if (!wrapRef.current) return;

        wrapRef.current.style.height = `${size.height}px`;
      },
      width: '100%',
      height: '100%',
    }).embed(wrapRef.current);

    if (wrapRef.current) {
      wrapRef.current.style.display = 'block';
      wrapRef.current.style.maxHeight = '33rem';
    }
  };

  return (
    <>
      <div className="mb-2 w-full">
        <FormProvider {...method}>
          <Controller
            name="address"
            control={control}
            render={({ field: { value } }) => (
              <Input
                name={name}
                label="주소"
                type="text"
                readOnly
                placeholder="주소를 검색해주세요."
                button={
                  <InputButton
                    buttonText="주소검색"
                    color="#000"
                    onSubmit={() => searchRef.current?.click()}
                  />
                }
                value={value as string}
              />
            )}
          />
        </FormProvider>

        <input
          ref={searchRef}
          className="hidden"
          type="button"
          onClick={execDaumPostcode}
          value="주소검색"
        />
      </div>

      <div
        className="w-full h-auto relative border border-black my-1 hidden"
        ref={wrapRef}
      >
        <Image
          src="//t1.daumcdn.net/postcode/resource/images/close.png"
          className="cursur-pointer absolute right-0 top-[-1px] z-10"
          onClick={foldDaumPostcode}
          alt="접기 버튼"
        />
      </div>
    </>
  );
};

export default AddressSearch;
