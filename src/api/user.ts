import API from './api';

/**
 * @deprecated
 * 초기 서버에 저장된 레시피 개수 불러오는 용도지만
 * 바로 api 호출하여 redux를 업데이트 하는 식으로 구조를 바꿔서
 * 필요없을 듯 하다
 *
 * @param recipeCount
 */
export const sendRecipeCount = async () => {
  await API.get('/user/recipe-count');
  console.log('update redux recipe count, save server');
};

export const sendRefriger = async (refriger: Refriger) => {
  await API.put('/user/refriger', refriger);
  console.log('update redux refriger, save server');
};
