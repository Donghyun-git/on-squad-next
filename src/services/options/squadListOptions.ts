import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/api/common";

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
export const squadListOptions = queryOptions({
  queryKey: ["@test"],
  queryFn: async () => {
    const res = await apiFetch.get<{ content: string[] }>(
      "https://www.na-holo.site/api/recipes"
    );

    return res.data?.content;
  },
});
