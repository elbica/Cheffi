import React from 'react';
import styled from 'styled-components/native';
import Fonts from '../Fonts';
import {ImageButton} from '../Buttons';

const DUMMY_URI = 'https://source.unsplash.com/random';

export default function HotRecipes() {
  return (
    <HotRecipeWrap>
      <Fonts size="large" padH="2%" padV="2%">
        Hot 레시피
      </Fonts>
      {hotRecipes.map((recipe, idx) => (
        <ImageButton
          uri={DUMMY_URI}
          width="100%"
          height="200px"
          marginV="1%"
          key={idx}
        />
      ))}
    </HotRecipeWrap>
  );
}

const HotRecipeWrap = styled.View`
  /* flex-wrap: wrap; */
  flex: 0.1;
  margin-top: 5%;
`;
const hotRecipes = [
  {
    title: 'hot1',
    etc: 'asdf1',
    goal: 'recipe1',
  },
  {
    title: 'hot2',
    etc: 'asdf2',
    goal: 'recipe2',
  },
  {
    title: 'hot3',
    etc: 'asdf2',
    goal: 'recipe2',
  },
];
