import API from './api';

export const sendForm = async (form: FormInfo): Promise<string[]> => {
  form.nickname = form.nickname || '익명';
  form.dislikeIngredient = form.dislikeIngredient?.flat();
  form.likeRecipesId = form.likeRecipesId?.flat();
  form.problems = form.problems?.flat();
  form.photo = form.photo || 'dummy';
  delete form.ingredients;
  console.log('form: ', form);
  const { data } = await API.put('/user/info', { data: form });
  return data;
};
