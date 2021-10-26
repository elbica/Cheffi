import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { theme, vh, vw } from '../../assets/styles/theme';
import * as Progress from 'react-native-progress';
import { CheffiBowl } from './Images';

export const Indicator = () => {
  return (
    <IndicatorWrap>
      <ActivityIndicator size="large" color="#ff9140" />
    </IndicatorWrap>
  );
};
export const RelativeIndicator = () => {
  return (
    <RelativeIndicatorWrap>
      <ActivityIndicator size="large" color="#ff9140" />
    </RelativeIndicatorWrap>
  );
};

export const ProgressBar = ({ ...rest }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progress = 0;
    let interval = setInterval(() => {
      progress += Math.random() / 5;
      if (progress > 1) {
        progress = 1;
      }
      setProgress(progress);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <ProgressBarWrap {...rest}>
      <Wrap>
        <CheffiBowl />
        <Progress.Bar
          progress={progress}
          borderWidth={0}
          width={150}
          color="rgba(255, 127, 64, 1)"
        />
      </Wrap>
    </ProgressBarWrap>
  );
};

export const AbsoluteProgressBar = styled(ProgressBar)`
  position: absolute;
  width: ${100 * vw}px;
  height: ${100 * vh}px;
  top: 0;
  left: 0;
`;

const IndicatorWrap = styled.View`
  height: ${100 * vh}px;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${100 * vw}px;
  background-color: white;
`;
const RelativeIndicatorWrap = styled(IndicatorWrap)`
  height: auto;
  min-height: ${25 * vh}px;
  width: auto;
  position: relative;
  align-self: center;
`;
const ProgressBarWrap = styled(IndicatorWrap)`
  background-color: ${theme.color['bgColor']};
  justify-content: center;
  align-items: center;
  padding-bottom: 107px;
`;
const Wrap = styled.View`
  width: auto;
  height: auto;
  justify-content: center;
  align-items: center;
  left: 3px;
`;
