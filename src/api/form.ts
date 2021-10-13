import API from './api';

export const sendForm = async (form: FormInfo): Promise<string[]> => {
  form.dislikeIngredient = form.dislikeIngredient?.flat();
  form.likeRecipesId = form.likeRecipesId?.flat();
  form.problems = form.problems?.flat();
  console.log('form: ', form);
  const { data } = await API.put('/user/info', { data: form });
  return data;
};
