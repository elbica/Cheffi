import debounce from 'debounce-promise';
import API from '.';

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
    const data = await API.post('/recipe/NumPossiRP', ingre);
    console.log('🍉delay call', data);
    return data;
  },
  1000,
  { leading: true },
);

export const getRecipeNumber = async (ingre: Ingredients): Promise<number> => {
  console.log('recipe number api call🍎');
  const { data } = await delayData(ingre);
  return data;
};

/**
 *
 * @param recipeId 레시피 id
 * @returns 레시피 id에 해당하는 레시피 정보
 */

export const getRecipeInfo = async (recipeId: {
  id: string;
}): Promise<RecipeInfo> => {
  const { data } = await API.post('/recipe/ShowRPInspect', recipeId);
  return data;
};

/**
 *
 * @param ingredients 사용자가 선택한 재료 배열
 * @returns 재료 배열로 만들 수 있는 레시피 배열
 */
export const getRecipeList = async (
  ingredients: Ingredients,
): Promise<Recipe[]> => {
  const { data } = await API.post('/recipe/ListPossiRP', ingredients);
  return data;
};
