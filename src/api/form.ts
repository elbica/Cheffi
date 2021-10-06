import API from './api';

export const sendForm = async (form: { like: string[] }): Promise<string[]> => {
  const { data } = await API.post('/user/SaveLikeDemo', form);
  console.log(data);
  return data;
};
