import { queryOptions } from '@tanstack/react-query';
import {
  crewDetailGetFetch,
  CrewDetailGetFetchParams,
} from '@/api/crew/crewDetailGetFetch';

export const CREW_DETAIL_QUERY_KEY = '@crew-detail' as const;

/**
 * 크루 상세 정보 쿼리 옵션
 * - server side
 */
export const crewDetailOptions = ({ crewId }: CrewDetailGetFetchParams) =>
  queryOptions({
    queryKey: [CREW_DETAIL_QUERY_KEY, crewId],
    queryFn: async () => {
      const res = await crewDetailGetFetch({ crewId });

      return res.data.data;
    },
  });
