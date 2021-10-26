import React from 'react';
import { AppWrap } from '../assets/styles/theme';
import { AddIngredient } from '../components/__addIngredient/AddIngredient';
import { useRecommendIngres } from '../hooks/useRecipe';

export const AddIngredientPage = () => {
  const { data: recommendIngres } = useRecommendIngres();
  console.log('추천: ', recommendIngres);
  return (
    <AppWrap>
      <AddIngredient recommendIngres={recommendIngres} />
    </AppWrap>
  );
};
