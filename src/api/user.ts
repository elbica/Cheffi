import API from './api';

export const sendRefriger = async (refriger: Refriger) => {
  await API.put('/user/refriger', { refriger });
  console.log('✅update redux refriger, save server');
};

export const putUserScrap = async (
  id: number,
  place: number,
  rating: number = 3,
) => {
  await API.put('/user/scrap', { recipeInfo: { id, place, rating } });
  console.log('✅put redux user scrap, save server');
};
export const deleteUserScrap = async (id: number) => {
  await API.delete('/user/scrap', { data: { id } });
  console.log('❌delete redux user scrap, save server');
};

export const putUserHistory = async (
  id: number,
  place: number,
  rating: number = 3,
) => {
  await API.put('/user/history', { recipeInfo: { id, place, rating } });
  console.log('✅put user history, save server');
};
export const deleteUserHistory = async (id: number) => {
  await API.delete('/user/history', { data: { id } });
  console.log('❌delete user history, save server');
};

export const putUserInfo = (
  statusMessage: string,
  nickname: string,
  photo: string = 'dummy',
) => {
  API.put('/user/info', { data: { nickname, photo, statusMessage } });
};
export const putUserPreference = () => API.put('/user/preference');
