import React from 'react';
import styled from 'styled-components/native';
import { vh, theme } from '../../assets/styles/theme';
import Fonts from './Fonts';
import { Scale } from './Images';

export const PossibleRecipe = ({ number }: { number?: number }) => {
  return (
    <PossibleRecipeWrap>
      <Scale />
      <Fonts
        color="tableBlack"
        children={`${number || 0} 개의 레시피를 만들 수 있어요!`}
        size="mediumLarge"
        padH="8px"
      />
    </PossibleRecipeWrap>
  );
};

const PossibleRecipeWrap = styled.View`
  border-radius: 10px;
  width: 100%;
  padding-top: ${1.3 * vh}px;
  padding-bottom: ${1.3 * vh}px;
  background-color: ${theme.color.carrot + '22'};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 50px;

  margin-top: ${1.8 * vh}px;
  margin-bottom: ${1.8 * vh}px;
`;
