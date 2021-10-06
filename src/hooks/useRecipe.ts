import { useQuery } from 'react-query';
import { getRecipeInfo, getRecipeList, getRecipeNumber } from '../api';

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

export const useRecipeList = (data: Refriger) => {
  return useQuery<Recipe[]>(['RecipeList', ...data], () => getRecipeList(), {
    staleTime: 1000 * 60 * 60 * 12,
  });
};

export const useRecipeInfo = (data: number) => {
  return useQuery<RecipeInfo>(['RecipeInfo', data], () => getRecipeInfo(data), {
    enabled: !!data,
    staleTime: 1000 * 60 * 60 * 12,
  });
};
