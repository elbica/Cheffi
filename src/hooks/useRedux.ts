import { useSelector } from 'react-redux';
import { RootState } from '../redux/modules';
import { store } from '../redux/store';

export const useRecipeCount = () =>
  useSelector((state: RootState) => state.user.recipeCount);

export const useRefrigerIngredient = () =>
  useSelector((state: RootState) => state.refriger);
export const useCommonIngredient = () =>
  useSelector((state: RootState) => state.ingredient);

export const useIsLogin = () => useSelector((state: RootState) => state.auth);
export const useIsRecipeScrap = (recipeid: number) =>
  useSelector((state: RootState) => state.user.scrapRecipesId).includes(
    recipeid,
  );
export const useRecipeScrap = () =>
  useSelector((state: RootState) => state.user.scrapRecipesId);
export const useRecipeHistory = () => store.getState().user.historyRecipesId;
export const useIsRecipeHistory = (recipeid: number) =>
  useSelector((state: RootState) => state.user.historyRecipesId).includes(
    recipeid,
  );
export const useUserInfo = () => useSelector((state: RootState) => state.user);
