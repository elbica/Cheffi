import { useQuery } from 'react-query';
import { useRefrigerIngredient } from './useRedux';
import API, { getRecipeInfo, getRecipeList, getRecipeNumber } from '../api';
import { useDispatch } from 'react-redux';
import { userRecipeCount } from '../redux/modules/user';
import { SilentLogin } from '../api/auth';

export const useTestAxios = () => {
  API.post('/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

let recipeNumberTimer = Date.now();

export const useRecipeNumber = (data?: Ingredients) => {
  const ingre = useRefrigerIngredient();
  if (!data) data = { ingre };

  const timer = (Date.now() - recipeNumberTimer) / 1000;
  recipeNumberTimer = Date.now();

  return useQuery<number>(
    ['RecipeNumber', ...data.ingre],
    () => getRecipeNumber(data as Ingredients),
    {
      enabled: !!data,
      ...(timer < 1 && { cacheTime: 0 }),
      staleTime: 1000 * 60 * 60 * 12,
    },
  );
};

export const useRecipeList = (data?: Ingredients) => {
  const ingre = useRefrigerIngredient();
  if (!data) data = { ingre };
  console.log('useRecipeList');
  return useQuery<Recipe[]>(
    ['RecipeList', data],
    () => getRecipeList(data as Ingredients),
    {
      enabled: !!data,
      staleTime: 1000 * 60 * 60 * 12,
    },
  );
};

export const useRecipeInfo = (data: { id: string }) => {
  return useQuery<RecipeInfo>(['RecipeInfo', data], () => getRecipeInfo(data), {
    enabled: !!data,
    staleTime: 1000 * 60 * 60 * 12,
  });
};

/**
 * @description
 * 어플 시작 시
 * 사용자 재료로 레시피 리스트(api), 개수(redux) 초기화
 */
export const useRecipeInit = async () => {
  console.log('🦊recipe init, 자동 로그인');
  await SilentLogin();
  const dispatch = useDispatch();
  const ingre = useRefrigerIngredient();
  useRecipeList({ ingre });
  const { data } = useRecipeNumber({ ingre });
  if (data) {
    dispatch(userRecipeCount(data));
  }
};
