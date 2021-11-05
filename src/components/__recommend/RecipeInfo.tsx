import React from 'react';
import styled from 'styled-components/native';
import Fonts from '../elements/Fonts';
import { Calories, Clock, EmptyStar } from '../elements/Images';

export const RecipeInfo = ({ time, calories, scrap }: RecipeInfoProps) => {
  return (
    <RecipeInfoWrap>
      {time !== '' && (
        <InfoElementWrap>
          <Clock />
          <Fonts
            children={time === '분' ? '- 분' : time}
            color="tableBlack"
            size="medium"
          />
        </InfoElementWrap>
      )}
      {calories && (
        <InfoElementWrap>
          <Calories />
          <Fonts
            children={calories.toString() + ' kcal'}
            color="tableBlack"
            size="medium"
          />
        </InfoElementWrap>
      )}
      <InfoElementWrap>
        <EmptyStar />
        <Fonts
          children={scrap ? scrap.toString() : '0'}
          color="tableBlack"
          size="medium"
        />
      </InfoElementWrap>
    </RecipeInfoWrap>
  );
};

const RecipeInfoWrap = styled.View`
  flex-direction: row;
  height: auto;
  flex-wrap: wrap;
  padding-top: 5px;
`;

const InfoElementWrap = styled.View`
  width: auto;
  flex-direction: row;
  margin-right: 15px;
  align-items: center;
`;

type RecipeInfoProps = Pick<RecipeInfo, 'time' | 'scrap' | 'calories'>;
