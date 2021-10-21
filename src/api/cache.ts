import { queryClient } from '../App';

export const getCachedRecipeCount = (refriger: Refriger) => {
  const ret = queryClient.getQueryData(['RecipeNumber', ...refriger]);
  return ret as number;
};

export const setCachedInit = (
  randomList: Recipe[],
  number: number,
  list: any,
  ingre: Refriger,
  recommendIngre: Ingredient[],
) => {
  queryClient.setQueryData(['RecipeRandomList', 3], randomList);
  queryClient.setQueryData(['RecipeNumber', ...ingre], number);
  queryClient.setQueryData(['RecipeList', ...ingre], list);
  queryClient.setQueryData(['RecommendIngre', ...ingre], recommendIngre);
};

export const clearCache = () => queryClient.clear();
