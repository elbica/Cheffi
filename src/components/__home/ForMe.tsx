import React from 'react';
import styled from 'styled-components/native';
import {ImageButton} from '../elements/Buttons';
import Fonts from '../Fonts';

const DUMMY_URI = 'https://source.unsplash.com/random';
const DUMMY_TEXT = '1+1 더 주니어 세트 15종';
const DUMMY_TEXT_DESC = '15종 다이어트 식판';

export default function ForMe() {
  return (
    <ForMeContainer>
      <Fonts size="large" padH="2%" padV="10px">
        나를 위한 추천 레시피
      </Fonts>
      <ImageButton uri={DUMMY_URI} width="100%" height="200px" marginV="2%" />
      <ImageButton uri={DUMMY_URI} width="100%" height="66px" marginV="2%">
        <Fonts color="white" padH="5%" padV="1%" size="large" bold>
          {DUMMY_TEXT}
        </Fonts>
        <Fonts color="white" padH="5%">
          {DUMMY_TEXT_DESC}
        </Fonts>
      </ImageButton>
    </ForMeContainer>
  );
}

const ForMeContainer = styled.View`
  flex: 0.1;
`;
