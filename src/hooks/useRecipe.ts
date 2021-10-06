import { useQuery } from 'react-query';
// import { useRefrigerIngredient } from './useRedux';
import API, { getRecipeInfo, getRecipeList, getRecipeNumber } from '../api';
import { store } from '../redux/store';
import { SilentLogin } from '../api/auth';
import { queryClient } from '../App';

export const useTestAxios = () => {
  API.post('/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

let recipeNumberTimer = Date.now();

export const useRecipeNumber = (data: Refriger) => {
  // const ingre = useRefrigerIngredient();
  // if (!data) data = ingre;

  const timer = (Date.now() - recipeNumberTimer) / 1000;
  recipeNumberTimer = Date.now();

  return useQuery<number>(
    ['RecipeNumber', ...data],
    () => getRecipeNumber(data as Refriger),
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

/**
 * @description
 * 어플 시작 시 로그인 되어있다면 서버로부터 정보 불러온다
 * 사용자 재료로 레시피 리스트(api), 개수(redux) 초기화
 * number dispatch 필요
 * 레시피 개수의 경우 추후 api로 불러오지 않고 persist의 값을 사용하는 방식으로 deprecated 될 수 있다
 *
 */
export const RecipeInit = async () => {
  console.log('🦊recipe init');
  const isLogin = await SilentLogin();
  let number = 0;
  if (isLogin) {
    const ingre = store.getState().refriger;
    number = await getRecipeNumber(ingre);
    const list = await getRecipeList();
    queryClient.setQueryData(['RecipeList', ...ingre], list);
    queryClient.setQueryData(['RecipeNumber', ...ingre], number);
  }
  return { isLogin, number };
};
