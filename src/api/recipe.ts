import debounce from 'debounce-promise';
import API from './api';
import { queryClient } from '../App';
import { store } from '../redux/store';
import { silentLogin } from './auth';
import { IMAGE_HAEMUK_URL, IMAGE_MANGAE_URL } from '../../config';
import { setCachedInit } from '.';

const RECIPE_LIST_STEP = 6;

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
    console.log('delayed recipe number api call🍎');
    const data = await API.post('/recipe/number', ingre);
    return data;
  },
  1000,
  { leading: false },
);

export const getRecipeNumber = async (refriger: Refriger): Promise<number> => {
  const {
    data: { num },
  } = await delayData({ refriger });
  return num || 0;
};

/**
 *
 * @param recipeId 레시피 id
 * @returns 레시피 id에 해당하는 레시피 정보
 */

export const getRecipeInfo = async (recipeId: number): Promise<RecipeInfo> => {
  const {
    data: { recipe },
  } = await API.get(`/recipe/info?id=${recipeId}`);
  return recipe[0];
};

/**
 *
 * @param ingredients 사용자가 선택한 재료 배열
 * @returns 재료 배열로 만들 수 있는 레시피 배열
 */
export const getRecipeList = async (
  page: number = 1,
): Promise<getRecipeListReturn> => {
  const {
    data: { recipe, maxPage = 999 },
  } = await API.get(`/recipe/list?page=${page}&step=${RECIPE_LIST_STEP}`);
  console.log('🍉recipe list call', recipe);

  return {
    recipe: recipe ?? [],
    maxPage,
    available: page ? page < maxPage : false,
    nextPage: page + 1,
  };
};
export const getRecipeRandomList = async (num?: number): Promise<Recipe[]> => {
  const {
    data: { recipe },
  } = await API.get(`/recipe/random-list?num=${num || 3}`);
  // console.log('🐹recipe random list call', recipe);

  return recipe;
};

/**
 * @description
 * 어플 시작 시 로그인 되어있다면 서버로부터 정보 불러온다
 * 사용자 재료로 레시피 리스트(api), 개수(redux) 초기화
 * number dispatch 필요
 * 레시피 개수의 경우 추후 api로 불러오지 않고 persist의 값을 사용하는 방식으로 deprecated 될 수 있다
 *
 */
export const getInitialRecipe = async () => {
  console.log('🦊recipe init');
  try {
    const login = await silentLogin();
    let number = 0,
      list: getRecipeListReturn,
      randomList: Recipe[] = [];
    if (login) {
      const ingre = store.getState().refriger;

      [number, randomList, list] = await Promise.all([
        getRecipeNumber(ingre),
        getRecipeRandomList(),
        getRecipeList(),
      ]);
      const initList = { pageParams: [1], pages: [list] };
      setCachedInit(randomList, number, initList, ingre);
    }
    return { login, number, randomList };
  } catch (e) {
    console.log('recipe init error:', e);
    return { error: true, number: 0 };
  }
};

export const getRecipeImageUri = (recipeid: number, platform: string) => {
  switch (platform) {
    case 'haemuk':
      return `${IMAGE_HAEMUK_URL}/${recipeid}.jpg`;
    case 'mangae':
      return `${IMAGE_MANGAE_URL}/${recipeid}.png`;
    default:
      return 'dummy';
  }
};

type getRecipeListReturn = {
  recipe: Recipe[];
  maxPage: number;
  nextPage: number;
  available: boolean;
};
