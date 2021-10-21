import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { theme, vh } from '../../assets/styles/theme';
import { CircleButton } from '../elements/Buttons';
import Divs, { RowDivs } from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { Review, Scrap, Time } from '../elements/Images';
import { RecipeInfo } from '../__recommend/RecipeInfo';

const DUMMY_TEXT =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa neque aliquid nulla obcaecati, esse mollitia fuga sapiente illo? Eius, unde corrupti.';

export default function RecipeContent({ data }: { data: RecipeInfo }) {
  return (
    <RecipeContentContainer>
      {data && (
        <>
          <Divs height="auto">
            <Fonts size="large" children={data.title} bold />
          </Divs>
          <RecipeInfo
            calories={data.calories}
            time={data.time}
            scrap={data.scrap}
          />
          <Divider />
          <Divs marginV="10px">
            <DescriptionWrap>
              <Fonts children={DUMMY_TEXT} color="tableGray" />
            </DescriptionWrap>
            <Fonts
              children="나를 위한 추천 레시피"
              size="large"
              color="tableBlack"
              padV="10px"
            />
            <IngredientContainer>
              {data.ingredient.map(ingre => (
                <CircleButton
                  key={ingre.name}
                  radius={30}
                  marginH="3px"
                  color="light"
                  onPress={() => {}}>
                  <Text>{ingre.name}</Text>
                  <Text>{ingre.amount}</Text>
                </CircleButton>
              ))}
            </IngredientContainer>
          </Divs>
        </>
      )}
    </RecipeContentContainer>
  );
}

const RecipeContentContainer = styled.View`
  width: 86%;
  margin: 0 auto;
  /* height: 200px; */
  padding-top: ${3 * vh}px;
  /* background-color: red; */
`;
const Divider = styled.View`
  height: 1.5px;
  width: 106%;
  /* left: -3%;
  top: -5px; */
  margin-top: ${1 * vh}px;
  margin-bottom: ${1 * vh}px;
  align-self: center;
  background-color: ${theme.color['tableGray'] + '70'};
`;

const IngredientContainer = styled.View`
  flex-direction: row;
  /* padding-top: 10px; */
`;
const DescriptionWrap = styled.View`
  justify-content: center;
  align-items: center;
`;
