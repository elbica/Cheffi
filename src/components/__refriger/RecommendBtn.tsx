import React from 'react';
import styled from 'styled-components/native';
import { theme, vh } from '../../assets/styles/theme';
import Fonts from '../elements/Fonts';

export const RecommendButton = ({ number, onPress }: RecomBtnProps) => {
  return (
    <NumberButtonWrap onPress={() => onPress()}>
      <Fonts children={`${number}개 재료 추가`} color="white" size="large" />
    </NumberButtonWrap>
  );
};

const NumberButtonWrap = styled.TouchableOpacity`
  width: 100%;
  height: ${6 * vh}px;
  border-radius: 10px;
  background-color: ${theme.color['carrot']};
  justify-content: center;
  align-items: center;
  margin-top: ${2 * vh}px;
`;

interface RecomBtnProps {
  number: number;
  onPress: Function;
}
