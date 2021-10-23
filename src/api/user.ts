import API from './api';

/**
 * @deprecated
 * 초기 서버에 저장된 레시피 개수 불러오는 용도지만
 * 바로 api 호출하여 redux를 업데이트 하는 식으로 구조를 바꿔서
 * 필요없을 듯 하다
 *
 * @param recipeCount
 */

export const sendRefriger = async (refriger: Refriger) => {
  await API.put('/user/refriger', { refriger });
  console.log('✅update redux refriger, save server');
};

/**
 * @description defualt star 3
 */
export const putUserScrap = async (
  id: number,
  place: number,
  rating: number = 3,
) => {
  await API.put('user/scrap', { recipeInfo: { id, place, rating } });
  console.log('✅put redux user scrap, save server');
};
export const deletetUserScrap = async (id: number) => {
  await API.delete('user/scrap', { data: { id } });
  console.log('❌delete redux user scrap, save server');
};

/**
 * @description defualt star 3
 */
export const putUserHistory = async (
  id: number,
  place: number,
  rating: number = 3,
) => {
  await API.put('user/scrap', { recipeInfo: { id, place, rating } });
  console.log('✅put redux user history, save server');
};
export const deletetUserHistory = async (id: number) => {
  await API.delete('user/scrap', { data: { id } });
  console.log('❌delete redux user history, save server');
};
