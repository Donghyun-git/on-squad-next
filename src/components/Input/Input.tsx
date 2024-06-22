import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { useExtractNumberHandler } from '@/hooks/useExtractNumberHandler';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CustomInputPropsType<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  helperText?: string;

  type: 'email' | 'text' | 'password';

  extractNumber?: boolean;
  button?: ReactNode | ReactNode[];
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
}

const CustomInput = <T extends FieldValues>(props: CustomInputPropsType<T>) => {
  const {
    name,
    label,
    button,
    type,
    helperText,
    extractNumber = false,
    ...rest
  } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const fieldError = errors[name];
  const errorMessage = fieldError ? (fieldError.message as string) : null;

  const handleExtractNumber = useExtractNumberHandler();

  return (
    <div className={`w-full form-control ${fieldError ? 'is-invalid' : ''}`}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="w-full">
            {label ? (
              <div className="flex items-center mb-2">
                <Label htmlFor={name} className="block text-gray-700">
                  {label}
                </Label>
              </div>
            ) : null}

            <div className="relative">
              <Input
                id={name}
                type={type}
                value={value}
                onChange={
                  extractNumber
                    ? (e) => {
                        handleExtractNumber(e);
                        onChange(e);
                      }
                    : onChange
                }
                className={`${cn(
                  `block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 ${
                    fieldError &&
                    'border-2 border-red-500 focus-visible:outline-red-500 focus-visible:border-red-500'
                  }`,
                )}`}
                {...rest}
              />
              {button}
            </div>
            {fieldError ? (
              <p className="mt-2 text-sm text-left text-red-600">
                {errorMessage}
              </p>
            ) : helperText ? (
              <p className="mt-2 text-sm text-left text-gray-500">
                {helperText}
              </p>
            ) : null}
          </div>
        )}
      />
    </div>
  );
};

export default CustomInput;
