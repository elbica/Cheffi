import axios from 'axios';
import {useQuery} from 'react-query';

axios.defaults.baseURL = 'http://18.220.121.204:8080';

export const useTestAxios = () => {
  axios
    .get('/')
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

const getRecipeNumber = async (param: Ingredients): Promise<number> => {
  const {data} = await axios.post('/NumPossiRP', param);
  return data;
};

export const useRecipeNumber = (data: Ingredients) => {
  return useQuery<number>(['RecipeNumber', data], () => getRecipeNumber(data), {
    enabled: !!data,
  });
};

interface Ingredients {
  ingre: string[];
}
