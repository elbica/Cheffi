import axios from 'axios';
import { useQuery } from 'react-query';
import { useRefrigerIngredient } from './useRedux';

axios.defaults.baseURL = 'http://18.220.121.204:8080';

export const useTestAxios = () => {
  axios
    .get('/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

/**
 *
 * @param ingredients 사용자가 선택한 재료 배열
 * @returns 재료 배열로 만들 수 있는 레시피 수
 */
const GetRecipeNumber = async (ingre: Ingredients): Promise<number> => {
  // const ingre = useRefrigerIngredient();
  const { data } = await axios.post('/NumPossiRP', ingre);
  return data;
};

export const useRecipeNumber = (data?: Ingredients) => {
  const ingre = useRefrigerIngredient();
  if (!data) data = { ingre };

  // console.log(data);
  return useQuery<number>(
    ['RecipeNumber', data],
    () => GetRecipeNumber(data as Ingredients),
    {
      enabled: !!data,
    },
  );
};

/**
 *
 * @param ingredients 사용자가 선택한 재료 배열
 * @returns 재료 배열로 만들 수 있는 레시피 배열
 */
const getRecipeList = async (ingredients: Ingredients): Promise<Recipe[]> => {
  const { data } = await axios.post('/ListPossiRP', ingredients);
  return data;
};

export const useRecipeList = (data?: Ingredients) => {
  const ingre = useRefrigerIngredient();
  if (!data) data = { ingre };
  // console.log('useRecipeList');
  return useQuery<Recipe[]>(
    ['RecipeList', data],
    () => getRecipeList(data as Ingredients),
    {
      enabled: !!data,
    },
  );
};

/**
 *
 * @param recipeId 레시피 id
 * @returns 레시피 id에 해당하는 레시피 정보
 */

const getRecipeInfo = async (recipeId: { id: string }): Promise<RecipeInfo> => {
  const { data } = await axios.post('/ShowRPInspect', recipeId);
  return data;
};

export const useRecipeInfo = (data: { id: string }) => {
  return useQuery<RecipeInfo>(
    ['RecipeInfot', data],
    () => getRecipeInfo(data),
    {
      enabled: !!data,
    },
  );
};

interface Ingredients {
  ingre: string[];
}
