import { useSelector } from 'react-redux';
import { RootState } from '../redux/modules';

export const useRecipeCount = () =>
  useSelector((state: RootState) => state.user.recipeCount);

export const useRefrigerIngredient = () =>
  useSelector((state: RootState) => state.refriger);

export const useIsLogin = () => useSelector((state: RootState) => state.auth);
