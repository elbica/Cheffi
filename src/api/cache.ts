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
  scraps: any,
  scrapIds: number[],
) => {
  queryClient.setQueryData(['RecipeRandomList', 3], randomList);
  queryClient.setQueryData(['RecipeNumber', ...ingre], number);
  queryClient.setQueryData(['RecipeList', ...ingre], list);
  queryClient.setQueryData(['RecommendIngre', ...ingre], recommendIngre);
  queryClient.setQueryData(['ScrapList', ...scrapIds], scraps);
};

export const clearCache = () => queryClient.clear();
