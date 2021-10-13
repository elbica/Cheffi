import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { CircleButton } from '../elements/Buttons';
import Divs, { RowDivs } from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { Review, Scrap, Time } from '../elements/Images';

const DUMMY_TEXT =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa neque aliquid nulla obcaecati, esse mollitia fuga sapiente illo? Eius, unde corrupti. Tempora, eum exercitationem autem libero iste voluptate voluptates aliquid?';

export default function RecipeContent({ data }: { data: RecipeInfo }) {
  return (
    <RecipeContentContainer>
      {data && (
        <>
          <Divs marginV="20px" height="auto">
            <Fonts size="xlarge" children={data.title} bold padV="10px" />
            <Fonts children="임시 내용" />
          </Divs>
          <Divider />

          <Divs height="auto">
            <RowDivs height="auto" align>
              <RecipeProperty>
                <Review />
                <Fonts children="0" />
              </RecipeProperty>
              <RecipeProperty>
                <Time />
                <Fonts children={data.time} />
              </RecipeProperty>
              <RecipeProperty>
                <Scrap />
                <Fonts children={data.scrap || 0} />
              </RecipeProperty>
            </RowDivs>
            <Fonts children={DUMMY_TEXT} padV="10px" />
          </Divs>
          <Divs marginV="10px">
            <Fonts children="사용 재료" size="xlarge" bold padV="10px" />
            <IngredientContainer>
              {data.ingredient.map((ingre, idx) => (
                <CircleButton
                  key={idx}
                  radius={30}
                  marginH="3px"
                  color="light"
                  onPress={() => {}}>
                  <Text>{ingre}</Text>
                </CircleButton>
              ))}
            </IngredientContainer>
          </Divs>
        </>
      )}
    </RecipeContentContainer>
  );
}

/**
 * declare interface Recipe {
  scrap: string;
  time: string;
  calories: string;
  id: string;
  title: string;
}
declare interface RecipeInfo extends Recipe {
  ingredient: string[];
}
 */
const RecipeContentContainer = styled.View`
  width: 86%;
  margin: 0 auto;
  /* height: 200px; */
  /* background-color: red; */
`;
const Divider = styled.View`
  height: 1px;
  width: 106%;
  left: -3%;
  top: -5px;
  background-color: gray;
`;

const RecipeProperty = styled.View`
  padding-top: 10px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  height: auto;
  width: 60px;
`;

const IngredientContainer = styled.View`
  flex-direction: row;
  /* padding-top: 10px; */
`;
