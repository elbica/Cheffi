import React from 'react';
import { AppWrap } from '../assets/styles/theme';
import { AddIngredient } from '../components/__addIngredient/AddIngredient';
import { useRecommendIngres } from '../hooks/useRecipe';

export const AddIngredientPage = () => {
  const { data: recommendIngres } = useRecommendIngres();

  return (
    <AppWrap>
      <AddIngredient recommendIngres={recommendIngres} />
    </AppWrap>
  );
};
