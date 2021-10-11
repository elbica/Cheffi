import React from 'react';
import styled from 'styled-components/native';
import Fonts from '../elements/Fonts';
import { useNavigation } from '@react-navigation/core';
import RecipeThumbmail from '../__recommend/RecipeThumbnail';

export default function HotRecipes({ data }: { data: Recipe[] | undefined }) {
  // const { data, isLoading } = useRecipeRandomList();
  // queryClient.get
  const navigation = useNavigation();
  // console.log(data, isLoading);
  const onPress = (recipeid: number, platform: string) =>
    navigation.navigate('recipeInfo', { recipeid, platform });
  return (
    <HotRecipeWrap>
      <Fonts size="large" padH="2%" padV="10px">
        Hot 레시피
      </Fonts>
      {data?.map(recipe => (
        <RecipeThumbmail key={recipe.recipeid} {...recipe} onPress={onPress} />
      ))}
    </HotRecipeWrap>
  );
}

const HotRecipeWrap = styled.View`
  /* flex-wrap: wrap; */
  flex: 0.1;
  margin-top: 5%;
`;
