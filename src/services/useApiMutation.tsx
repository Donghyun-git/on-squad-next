import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  QueryKey,
} from '@tanstack/react-query';

import { AxiosResponse } from 'axios';
import { ResponseModel } from '@/api/model';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import { TOAST } from '@/constants/toast';
import { CircleX } from 'lucide-react';

export const useApiMutation = <
  TMutationKey extends [string, Record<string, unknown>?],
  TMutationFnData extends ResponseModel,
  TInvalidateKey extends [string, Record<string, unknown>?],
  TError = Error,
  TVariables = void,
  TContext = unknown,
>({
  mutationKey,
  fetcher,
  invalidateKey,
  options,
}: {
  mutationKey: TMutationKey;
  invalidateKey?: TInvalidateKey;
  fetcher: (variables: TVariables) => Promise<AxiosResponse<TMutationFnData>>;
  options?: Omit<
    UseMutationOptions<TMutationFnData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
  >;
}): UseMutationResult<TMutationFnData, TError, TVariables, TContext> => {
  const queryClient = useQueryClient();
  const { toast, hide } = useToast();

  return useMutation<TMutationFnData, TError, TVariables, TContext>({
    mutationKey,
    mutationFn: async (variables: TVariables) => {
      const res = await fetcher(variables);

      if (res.data.error) {
        throw new Error(res.data.error.message);
      }

      return res.data;
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        console.log(error.message);
        toast({
          title: error.message,
          className: TOAST.error,
          icon: <CircleX onClick={() => hide()} />,
        });
      }

      return error;
    },
    ...options,
    throwOnError: false,
  });
};
