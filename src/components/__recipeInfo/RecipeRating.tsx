import React from 'react';
import styled from 'styled-components/native';
import { EmptyRating, Rating } from '../elements/Images';

const STARS_ARRAY = [1, 2, 3, 4, 5];

export const RecipeRating = ({ rating, setRating }: RecipeRatingProps) => {
  return (
    <RecipeRatingWrap>
      {STARS_ARRAY.map((_, idx) => {
        const isRating = idx < rating;
        return (
          <RatingStarWrap
            onPress={() => setRating(idx + 1)}
            key={idx}
            activeOpacity={1}>
            {isRating ? <Rating /> : <EmptyRating />}
          </RatingStarWrap>
        );
      })}
    </RecipeRatingWrap>
  );
};

const RecipeRatingWrap = styled.View`
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  width: 100%;
  flex-direction: row;
`;
const RatingStarWrap = styled.TouchableOpacity`
  width: auto;
  height: auto;
`;
interface RecipeRatingProps {
  rating: number;
  setRating: Function;
}
