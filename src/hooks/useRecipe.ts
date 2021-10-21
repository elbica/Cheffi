import { useQuery, useInfiniteQuery } from 'react-query';
import {
  getRecipeRandomList,
  getRecipeInfo,
  getRecipeList,
  getRecipeNumber,
} from '../api';
import { useRefrigerIngredient } from './useRedux';

let recipeNumberTimer = Date.now();

export const useRecipeNumber = (data: Refriger) => {
  const timer = (Date.now() - recipeNumberTimer) / 1000;
  recipeNumberTimer = Date.now();
  return useQuery<number>(
    ['RecipeNumber', ...data],
    () => getRecipeNumber(data),
    {
      enabled: !!data,
      ...(timer < 1 && { cacheTime: 0 }),
      staleTime: 1000 * 60 * 60 * 12,
    },
  );
};

/**
 *
 * @param page
 * @returns 추가된 Recipe 배열
 * @description
 * infinite scroll을 위한 pagination 적용
 * useInfiniteQuery 사용
 *
 */
export const useRecipeList = () => {
  const refriger = useRefrigerIngredient();

  // console.log('list 실행', refriger);
  return useInfiniteQuery(
    ['RecipeList', ...refriger],
    ({ pageParam = 1 }) => getRecipeList(pageParam),
    {
      staleTime: 1000 * 60 * 60 * 12,
      getNextPageParam: lastpage =>
        lastpage.available ? lastpage.nextPage : 0,
    },
  );
};
export const useRecipeRandomList = (num?: number) => {
  if (!num) num = 3;
  return useQuery<Recipe[]>(
    ['RecipeRandomList', num],
    () => getRecipeRandomList(num),
    {
      staleTime: 1000 * 60 * 60 * 12,
      cacheTime: 1000 * 60 * 60,
    },
  );
};

export const useRecipeInfo = (data: number) => {
  return useQuery<RecipeInfo>(['RecipeInfo', data], () => getRecipeInfo(data), {
    enabled: !!data,
    staleTime: 1000 * 60 * 60 * 12,
  });
};
