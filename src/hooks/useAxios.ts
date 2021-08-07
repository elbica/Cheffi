import axios from 'axios';
import {useQuery} from 'react-query';

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
const getRecipeNumber = async (ingredients: Ingredients): Promise<number> => {
  const {data} = await axios.post('/NumPossiRP', ingredients);
  return data;
};

export const useRecipeNumber = (data: Ingredients) => {
  return useQuery<number>(['RecipeNumber', data], () => getRecipeNumber(data), {
    enabled: !!data,
  });
};

/**
 *
 * @param ingredients 사용자가 선택한 재료 배열
 * @returns 재료 배열로 만들 수 있는 레시피 배열
 */
const getRecipeList = async (ingredients: Ingredients): Promise<Recipe[]> => {
  const {data} = await axios.post('/ListPossiRP', ingredients);
  return data;
};

export const useRecipeList = (data: Ingredients) => {
  return useQuery<Recipe[]>(['RecipeList', data], () => getRecipeList(data), {
    enabled: !!data,
  });
};

/**
 *
 * @param recipeId 레시피 id
 * @returns 레시피 id에 해당하는 레시피 정보
 */

const getRecipeInspect = async (recipeId: {
  id: string;
}): Promise<RecipeInspect> => {
  const {data} = await axios.post('/ShowRPInspect', recipeId);
  return data;
};

export const useRecipeInspect = (data: {id: string}) => {
  return useQuery<RecipeInspect>(
    ['RecipeInspect', data],
    () => getRecipeInspect(data),
    {
      enabled: !!data,
    },
  );
};

interface Ingredients {
  ingre: string[];
}
interface Recipe {
  scrap: string;
  time: string;
  calories: string;
  id: string;
  title: string;
}
interface RecipeInspect extends Recipe {
  ingredient: string[];
}
