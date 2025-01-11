import { queryOptions } from '@tanstack/react-query';
import { crewListGetFetch } from '@/api/crew/crewListGetFetch';

export const CREW_LIST_QUERY_KEY = '@crew-list' as const;

/**
 * 예시 입니다.
 * @example
 *  
 * export const pokemonOptions = queryOptions({
 * queryKey: ['pokemon'],
 * queryFn: async () => {
 *   const response = await fetch('https://pokeapi.co/api/v2/pokemon/25')

 *  return response.json()
  },
})
 */
export const crewListOptions = queryOptions({
  queryKey: [CREW_LIST_QUERY_KEY],
  queryFn: async () => {
    const res = await crewListGetFetch();

    return res.data.data;
  },
});
