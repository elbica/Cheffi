import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/modules';
import { setIngredient } from '../redux/modules/ingredient';
import { RefrigerState, setRefriger } from '../redux/modules/refriger';
import { userRecipeCount } from '../redux/modules/user';

/**
 * @todo
 * ingredient를 변경할 때 hook 전체가 다시 선언된다
 * dispatch도 다시 선언되므로
 * useCallback을 사용하는 의미가 없는듯?
 *
 * dispatch 연속 3번..?
 *
 * @returns 재료 배열, 변경 함수
 */
export const useIngredient = (): useIngredientResult => {
  const dispatch = useDispatch();
  let ingredient = useSelector((state: RootState) => state.ingredient);
  const refriger = useSelector((state: RootState) => state.refriger);

  const saveIngredient = useCallback(
    (ingredients: RefrigerState, recipeCount: number) => {
      dispatch(setRefriger(ingredients));
      dispatch(setIngredient(ingredients));
      dispatch(userRecipeCount(recipeCount));
    },
    [dispatch],
  );
  const completeIngredient = useCallback(
    (ingredients: RefrigerState) => dispatch(setIngredient(ingredients)),
    [dispatch],
  );

  // console.log('🥗 Ingredient log..');
  if (!ingredient.length) {
    dispatch(setIngredient(refriger));
    ingredient = refriger;
  }
  return { refriger, ingredient, saveIngredient, completeIngredient };
};

export interface useIngredientResult {
  refriger: RefrigerState;
  ingredient: RefrigerState;
  saveIngredient: (ingredients: RefrigerState, recipeCount: number) => void;
  completeIngredient: (ingredients: RefrigerState) => void;
}
