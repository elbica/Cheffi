import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import Fonts from '../elements/Fonts';
import { useNavigation } from '@react-navigation/core';
import { HomeRecipeThumbnail } from '../__recommend/RecipeThumbnail';
import { RelativeIndicator } from '../elements/Indicators';

export default function HotRecipes({ data }: { data: Recipe[] | undefined }) {
  const navigation = useNavigation<RecipeInfoNavigationProp>();
  const onPress = useCallback(
    (recipeid: number, platform: Platform, place: number) =>
      navigation.navigate('recipeInfo', { recipeid, platform, place }),
    [navigation],
  );
  const section1 = data?.slice(0, data.length / 2);
  const section2 = data?.slice(data.length / 2, data.length);
  return (
    <HotRecipeWrap>
      <Fonts size="large" padH="0" padV="16px" color="tableBlack">
        {/* 🔥 Hot 레시피 */}
        ⭐️ 나를 위한 추천 레시피
      </Fonts>
      <ThumbnailWrap>
        {data && (
          <>
            <ThumbnailSectionWrap>
              {section1?.map((recipe, idx) => (
                <HomeRecipeThumbnail
                  key={recipe.recipeid}
                  {...recipe}
                  onPress={onPress}
                  place={2 * idx}
                />
              ))}
            </ThumbnailSectionWrap>
            <ThumbnailSectionWrap>
              {section2?.map((recipe, idx) => (
                <HomeRecipeThumbnail
                  key={recipe.recipeid}
                  {...recipe}
                  onPress={onPress}
                  place={2 * idx - 1}
                />
              ))}
            </ThumbnailSectionWrap>
          </>
        )}
      </ThumbnailWrap>
      {!data && <RelativeIndicator />}
    </HotRecipeWrap>
  );
}

const HotRecipeWrap = styled.View`
  height: auto;
  top: -10px;
`;
const ThumbnailWrap = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const ThumbnailSectionWrap = styled.View`
  width: 47.5%;
`;
