import { useQuery, useInfiniteQuery } from 'react-query';
import {
  getRecipeRandomList,
  getRecipeInfo,
  getRecipeList,
  getRecipeNumber,
  getRecommendIngres,
  getScrapList,
} from '../api';
import { useRefrigerIngredient } from './useRedux';

let recipeNumberTimer = Date.now();

export const useRecipeNumber = (data: Refriger, date = Date.now()) => {
  const timer = (date - recipeNumberTimer) / 1000;
  recipeNumberTimer = date;
  return useQuery<number>(
    ['RecipeNumber', ...data],
    () => getRecipeNumber(data),
    {
      enabled: !!data,
      ...(timer < 1 && { cacheTime: 0 }),
      staleTime: 1000 * 60 * 60 * 12,
      keepPreviousData: true,
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
        lastpage.available ? lastpage.nextPage : undefined,
    },
  );
};
export const useScrapList = (recipeids: number[]) => {
  return useInfiniteQuery(
    ['ScrapList', ...recipeids],
    ({ pageParam = 1 }) => getScrapList(pageParam, recipeids, recipeids.length),
    {
      staleTime: 1000 * 60 * 60 * 12,
      getNextPageParam: lastpage =>
        lastpage.available ? lastpage.nextPage : undefined,
    },
  );
};
export const useHistoryList = (recipeids: number[]) => {
  return useInfiniteQuery(
    ['HistoryList', ...recipeids],
    ({ pageParam = 1 }) => getScrapList(pageParam, recipeids, recipeids.length),
    {
      staleTime: 1000 * 60 * 60 * 12,
      getNextPageParam: lastpage =>
        lastpage.available ? lastpage.nextPage : undefined,
    },
  );
};
export const useRecommendIngres = () => {
  const refriger = useRefrigerIngredient();
  return useQuery(['RecommendIngre', ...refriger], () =>
    getRecommendIngres(refriger),
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
