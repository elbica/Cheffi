import { useNavigation } from '@react-navigation/core';
import React from 'react';
import styled from 'styled-components/native';
import { defaultShadow } from '../../assets/data/shadow';
import { vh, theme } from '../../assets/styles/theme';
import Fonts from '../elements/Fonts';
import { Note } from '../elements/Images';

export const EmptyRecipe = () => {
  const navigation = useNavigation<RecommendTabProp>();
  return (
    <EmptyRecipeWrap>
      <DescriptionWrap>
        <Note />
        <Fonts
          children="만들 수 있는 레시피가 없어요."
          color="tableBlack"
          size="mediumLarge"
          padV="4px"
        />
        <Fonts children="냉장고를 채워보세요!" color="tableGray" />
      </DescriptionWrap>
      <GotoButton onPress={() => navigation.jumpTo('내 냉장고')}>
        <Fonts children="냉장고 채우러 가기" color="white" size="mediumLarge" />
      </GotoButton>
    </EmptyRecipeWrap>
  );
};
const EmptyRecipeWrap = styled.View`
  margin: auto 0;
  height: auto;
`;
const DescriptionWrap = styled.View`
  justify-content: center;
  align-items: center;
`;

const GotoButton = styled(defaultShadow)`
  width: 100%;
  height: ${6 * vh}px;
  border-radius: 6px;
  background-color: ${theme.color['carrot']};
  justify-content: center;
  align-items: center;
  margin-top: ${3 * vh}px;
  margin-bottom: ${3 * vh}px;
`;
