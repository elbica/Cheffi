import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  getCachedRecipeCount,
  getRecipeNumber,
  sendRefriger,
  setCachedRecipeList,
} from '../api';
import { setIngredient, setRefriger, userRecipeCount } from '../redux/modules';
import { useRefrigerIngredient } from './useRedux';

export const useModifyIngredient = (): useIngredientResult => {
  const dispatch = useDispatch();
  const refriger = useRefrigerIngredient();

  const saveIngredient = useCallback(
    async (ingredients: Refriger) => {
      try {
        const [recipeNumber, _] = await Promise.all([
          getRecipeNumber(ingredients),
          sendRefriger(ingredients),
        ]);
        dispatch(setRefriger(ingredients));
        dispatch(setIngredient(ingredients));
        const recipeCount = getCachedRecipeCount(ingredients) || recipeNumber;
        dispatch(userRecipeCount(recipeCount));
        setCachedRecipeList(ingredients);
      } catch (e) {
        console.log('냉장고, 레시피 개수 저장 에러 발생: ', e);
      }
    },
    [dispatch],
  );
  const pushIngredient = useCallback(
    (ingredients: Refriger) => dispatch(setIngredient(ingredients)),
    [dispatch],
  );

  return {
    refriger,
    saveIngredient,
    pushIngredient,
  };
};

export interface useIngredientResult {
  refriger: Refriger;
  saveIngredient: (ingredients: Refriger) => Promise<void>;
  pushIngredient: (ingredients: Refriger) => void;
}
