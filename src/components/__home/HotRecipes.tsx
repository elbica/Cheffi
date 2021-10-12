import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import Fonts from '../elements/Fonts';
import { useNavigation } from '@react-navigation/core';
import RecipeThumbmail from '../__recommend/RecipeThumbnail';
import { MOCK_HOT_RECIPE } from '../../assets/data/mockRecipeData';

export default function HotRecipes({ data }: { data: Recipe[] | undefined }) {
  // const { data, isLoading } = useRecipeRandomList();
  // queryClient.get
  const navigation = useNavigation();
  // console.log(data, isLoading);
  const onPress = useCallback(
    (recipeid: number, platform: string) =>
      navigation.navigate('recipeInfo', { recipeid, platform }),
    [navigation],
  );
  return (
    <HotRecipeWrap>
      <Fonts size="large" padH="2%" padV="10px">
        Hot 레시피
      </Fonts>
      {data
        ? data.map(recipe => (
            <RecipeThumbmail
              key={recipe.recipeid}
              {...recipe}
              onPress={onPress}
            />
          ))
        : MOCK_HOT_RECIPE.map(recipe => (
            <RecipeThumbmail
              key={recipe.recipeid}
              {...recipe}
              onPress={onPress}
            />
          ))}
    </HotRecipeWrap>
  );
}

const HotRecipeWrap = styled.View`
  /* flex-wrap: wrap; */
  height: auto;
  margin-top: 16px;
`;
