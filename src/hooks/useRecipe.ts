import axios from 'axios';
import { useQuery } from 'react-query';
import { useRefrigerIngredient } from './useRedux';
import { API_URL } from '../../config';
import debounce from 'debounce-promise';

axios.defaults.baseURL = API_URL;

export const useTestAxios = () => {
  axios
    .post('/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

let recipeNumberTimer = Date.now();

/**
 *
 * @param ingredients 사용자가 선택한 재료 배열
 * @returns 재료 배열로 만들 수 있는 레시피 수
 *
 * @description
 * react query에 디바운싱을 적용하기 까다로운 것 같다..
 * delay가 1000ms 이하일 때 cacheTime을 0으로 적용하여 해결했다.
 * staleTime을 12시간으로 지정하여 똑같은 key에 대한 중복 api 호출을 방지했다.
 *
 */
const delayData = debounce(
  async ingre => {
    const data = await axios.post('/recipe/NumPossiRP', ingre);
    console.log('🍉delay call', data);
    return data;
  },
  1000,
  { leading: true },
);

const GetRecipeNumber = async (ingre: Ingredients): Promise<number> => {
  console.log('recipe number api call🍎');
  // const { data } = await axios.post('/NumPossiRP', ingre);

  const { data } = await delayData(ingre);
  return data;
};

export const useRecipeNumber = (data?: Ingredients) => {
  const ingre = useRefrigerIngredient();
  if (!data) data = { ingre };

  const timer = (Date.now() - recipeNumberTimer) / 1000;
  recipeNumberTimer = Date.now();

  return useQuery<number>(
    ['RecipeNumber', ...data.ingre],
    () => GetRecipeNumber(data as Ingredients),
    {
      enabled: !!data,
      ...(timer < 1 && { cacheTime: 0 }),
      staleTime: 1000 * 60 * 60 * 12,
    },
  );
};

/**
 *
 * @param ingredients 사용자가 선택한 재료 배열
 * @returns 재료 배열로 만들 수 있는 레시피 배열
 */
const getRecipeList = async (ingredients: Ingredients): Promise<Recipe[]> => {
  const { data } = await axios.post('/recipe/ListPossiRP', ingredients);
  return data;
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

/**
 *
 * @param recipeId 레시피 id
 * @returns 레시피 id에 해당하는 레시피 정보
 */

const getRecipeInfo = async (recipeId: { id: string }): Promise<RecipeInfo> => {
  const { data } = await axios.post('/recipe/ShowRPInspect', recipeId);
  return data;
};

export const useRecipeInfo = (data: { id: string }) => {
  return useQuery<RecipeInfo>(['RecipeInfo', data], () => getRecipeInfo(data), {
    enabled: !!data,
    staleTime: 1000 * 60 * 60 * 12,
  });
};

export const sendForm = async (form: { like: string[] }): Promise<string[]> => {
  const { data } = await axios.post('/user/SaveLikeDemo', form);
  console.log(data);
  return data;
};

interface Ingredients {
  ingre: string[];
}
