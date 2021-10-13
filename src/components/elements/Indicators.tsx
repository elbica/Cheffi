import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { vh, vw } from '../../assets/styles/theme';

export const Indicator = () => {
  return (
    <IndicatorWrap>
      <ActivityIndicator size="large" color="#ff9140" />
    </IndicatorWrap>
  );
};

const IndicatorWrap = styled.View`
  height: ${100 * vh}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${100 * vw}px;
`;
