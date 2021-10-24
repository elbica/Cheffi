import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import Fonts from '../elements/Fonts';
import { useNavigation } from '@react-navigation/core';
import RecipeThumbmail from '../__recommend/RecipeThumbnail';
import { MOCK_HOT_RECIPE } from '../../assets/data/mockRecipeData';

export default function HotRecipes({ data }: { data: Recipe[] | undefined }) {
  const navigation = useNavigation<RecipeInfoNavigationProp>();
  const onPress = useCallback(
    (recipeid: number, platform: Platform, place: number) =>
      navigation.navigate('recipeInfo', { recipeid, platform, place }),
    [navigation],
  );
  return (
    <HotRecipeWrap>
      <Fonts size="large" padH="0" padV="16px" color="tableBlack">
        🔥 Hot 레시피
      </Fonts>
      {data
        ? data.map((recipe, idx) => (
            <RecipeThumbmail
              key={recipe.recipeid}
              {...recipe}
              onPress={onPress}
              place={idx}
            />
          ))
        : MOCK_HOT_RECIPE.map((recipe, idx) => (
            <RecipeThumbmail
              key={recipe.recipeid}
              {...recipe}
              onPress={onPress}
              place={idx}
            />
          ))}
    </HotRecipeWrap>
  );
}

const HotRecipeWrap = styled.View`
  /* flex-wrap: wrap; */
  height: auto;
  /* margin-top: 16px; */
  top: -18px;
`;
