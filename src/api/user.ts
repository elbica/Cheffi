import API from './api';

export const patchRecipeCount = async (recipeCount: number) => {
  await API.patch('/user/recipe-count', { recipeCount });
  console.log('update redux recipe count, save server');
};

export const patchRefriger = async (refriger: Refriger) => {
  await API.patch('/user/refriger', { refriger });
  console.log('update redux refriger, save server');
};
