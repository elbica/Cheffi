import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/modules';
import { setIngredient } from '../redux/modules/ingredient';
import { RefrigerState, setRefriger } from '../redux/modules/refriger';

/**
 * @todo
 * ingredient를 변경할 때 hook 전체가 다시 선언된다
 * dispatch도 다시 선언되므로
 * useCallback을 사용하는 의미가 없는듯?
 *
 * @returns 재료 배열, 변경 함수
 */
export const useIngredient = (): useIngredientResult => {
  const dispatch = useDispatch();
  let ingredient = useSelector((state: RootState) => state.ingredient);
  const refriger = useSelector((state: RootState) => state.refriger);

  const saveIngredient = useCallback(
    (ingredients: RefrigerState) => dispatch(setRefriger(ingredients)),
    [dispatch],
  );
  const completeIngredient = useCallback(
    (ingredients: RefrigerState) => dispatch(setIngredient(ingredients)),
    [dispatch],
  );

  console.log('loggine..');
  if (!ingredient.length) {
    dispatch(setIngredient(refriger));
    ingredient = refriger;
  }
  return { ingredient, saveIngredient, completeIngredient };
};

export interface useIngredientResult {
  ingredient: RefrigerState;
  saveIngredient: (ingredients: RefrigerState) => void;
  completeIngredient: (ingredients: RefrigerState) => void;
}
