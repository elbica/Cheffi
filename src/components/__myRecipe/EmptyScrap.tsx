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
          children="저장한 레시피가 없어요."
          color="tableBlack"
          size="mediumLarge"
          padV="4px"
        />
        <Fonts children="좋아하는 레시피를 저장해 보세요!" color="tableGray" />
      </DescriptionWrap>
      <GotoButton onPress={() => navigation.jumpTo('추천레시피')}>
        <Fonts children="레시피 보러 가기" color="white" size="mediumLarge" />
      </GotoButton>
    </EmptyRecipeWrap>
  );
};
export const EmptyHistory = () => {
  const navigation = useNavigation<RecommendTabProp>();
  return (
    <EmptyRecipeWrap>
      <DescriptionWrap>
        <Note />
        <Fonts
          children="최근에 본 레시피가 없어요."
          color="tableBlack"
          size="mediumLarge"
          padV="4px"
        />
        <Fonts
          children="요리하고 싶은 레시피를 클릭해 보세요!"
          color="tableGray"
        />
      </DescriptionWrap>
      <GotoButton onPress={() => navigation.jumpTo('추천레시피')}>
        <Fonts children="레시피 보러 가기" color="white" size="mediumLarge" />
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
  elevation: 4;
`;
