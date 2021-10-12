import { useQuery } from 'react-query';
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
 * infinite scroll을 위한 pagination 적용으로 caching을 할 필요가 없다.
 * 어차피 데이터가 바뀌기 때문이다.
 *
 */
export const useRecipeList = (page: number) => {
  const refriger = useRefrigerIngredient();

  return useQuery<Recipe[]>(
    ['RecipeList', ...refriger, page],
    () => getRecipeList(page),
    {
      staleTime: 1000 * 60 * 60 * 12,
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
