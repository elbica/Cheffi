import { useSelector } from 'react-redux';
import { RootState } from '../redux/modules';

export const useRecipeCount = () =>
  useSelector((state: RootState) => state.user.recipeCount);

export const useRefrigerIngredient = () =>
  useSelector((state: RootState) => state.refriger);
export const useCommonIngredient = () =>
  useSelector((state: RootState) => state.ingredient);

export const useIsLogin = () => useSelector((state: RootState) => state.auth);
export const useIsRecipeComplete = (recipeid: number) =>
  useSelector((state: RootState) => state.recipe.complete).includes(recipeid);
export const useIsRecipeScrap = (recipeid: number) =>
  useSelector((state: RootState) => state.user.scrapRecipesId).includes(
    recipeid,
  );
