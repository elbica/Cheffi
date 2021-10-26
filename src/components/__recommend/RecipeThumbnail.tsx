import React from 'react';
import styled from 'styled-components/native';
import { getRecipeImageUri } from '../../api';
import { ImageButton } from '../elements/Buttons';
import Divs from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { RecipeInfo } from './RecipeInfo';

export default React.memo(function RecipeThumbmail({
  recipeid,
  scrap,
  time,
  calories,
  title,
  onPress,
  platform,
  place,
}: RecipeThumbnailProps) {
  const uri = getRecipeImageUri(recipeid, platform);
  // console.log('thumbnail: ', title);
  return (
    <WrapTouchableOpacity
      onPress={() => onPress(recipeid, platform, place)}
      activeOpacity={1}>
      <ImageButton
        key={recipeid}
        uri={uri}
        width="100%"
        height="130px"
        onPress={() => onPress(recipeid, platform, place)}
        radius={10}
      />
      <FontContainer>
        <RecipeTitle>
          <Fonts
            children={title ? title : '로딩중..'}
            color="black"
            size="large"
            padV="4px"
            bold
            lineHeight="large"
          />
        </RecipeTitle>
        <RecipeInfo calories={calories} time={time} scrap={scrap} />
      </FontContainer>
    </WrapTouchableOpacity>
  );
});

const FontContainer = styled(Divs)`
  padding-top: 10px;
  padding-left: 5px;
  height: auto;
`;

const RecipeTitle = styled.View`
  width: 90%;
  /* background-color: red; */
`;

const WrapTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  /* background-color: red; */
`;

interface RecipeThumbnailProps extends Recipe {
  onPress: (recipeid: number, platform: Platform, place: number) => void;
  place: number;
}
