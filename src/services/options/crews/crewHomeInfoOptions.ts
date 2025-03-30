import { queryOptions } from '@tanstack/react-query';
import {
  crewHomeInfoGetFetch,
  CrewHomeInfoGetFetchParams,
} from '@/api/crew/crewHomeInfoGetFetch';

export const CREW_HOME_INFO_QUERY_KEY = '@crew-home' as const;

/**
 * 크루 홈페이지 정보
 * - server side
 */
export const crewHomeInfoOptions = (params: CrewHomeInfoGetFetchParams) =>
  queryOptions({
    queryKey: [CREW_HOME_INFO_QUERY_KEY, params.crewId, params.category],
    queryFn: async () => {
      try {
        const res = await crewHomeInfoGetFetch(params);

        if (res.data.error) {
          throw new Error(res.data.error.message);
        }

        return res.data;
      } catch (error) {
        throw error;
      }
    },
  });
