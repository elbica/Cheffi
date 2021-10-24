import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import Fonts from '../elements/Fonts';
import RecipeThumbnail from '../__recommend/RecipeThumbnail';

export default function ForMe({ recipe }: { recipe: Recipe }) {
  const navigation = useNavigation<RecipeInfoNavigationProp>();
  const onPress = useCallback(
    (recipeid: number, platform: Platform, place: number) =>
      navigation.navigate('recipeInfo', { recipeid, platform, place }),
    [navigation],
  );
  return (
    <ForMeContainer>
      <Fonts size="large" padH="0" padV="16px" color="tableBlack">
        ⭐️ 나를 위한 추천 레시피
      </Fonts>
      <RecipeThumbnail {...recipe} onPress={onPress} place={0} />
    </ForMeContainer>
  );
}

const ForMeContainer = styled.View`
  height: auto;
  justify-content: space-between;
  /* background-color: red; */
  top: -18px;
`;
