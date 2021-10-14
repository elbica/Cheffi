import React from 'react';
import styled from 'styled-components/native';
import { vh } from '../../assets/styles/theme';
import { IngredientButton } from '../elements/Buttons';
import Fonts from '../elements/Fonts';

export const RecommendIngre = ({ ingredients }: RecommendIngreProps) => {
  return (
    <RecommendIngreWrap>
      <Fonts children="추천 재료" size="large" padV={`${2.7 * vh}px`} />
      <IngredientWrap>
        {ingredients.map(ingredient => (
          <IngredientButton children={ingredient.name} key={ingredient.name} />
        ))}
      </IngredientWrap>
    </RecommendIngreWrap>
  );
};

const RecommendIngreWrap = styled.View`
  height: auto;
  width: 100%;
`;
const IngredientWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color: green; */
  width: 102%;
  align-self: center;
`;
interface RecommendIngreProps {
  ingredients: Ingredient[];
}
