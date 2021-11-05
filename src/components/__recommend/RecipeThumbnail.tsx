import React from 'react';
import styled from 'styled-components/native';
import { getRecipeImageUri } from '../../api';
import { ImageButton } from '../elements/Buttons';
import Divs from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { RecipeInfo } from './RecipeInfo';

const RecipeTumbnail = React.memo(
  ({
    recipeid,
    scrap,
    time,
    calories,
    title,
    onPress,
    platform,
    place,
  }: RecipeThumbnailProps) => {
    const uri = getRecipeImageUri(recipeid, platform);
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
  },
);

export const HomeRecipeThumbnail = ({
  recipeid,
  scrap,
  time,
  calories,
  title,
  onPress,
  platform,
  place,
}: RecipeThumbnailProps) => {
  const uri = getRecipeImageUri(recipeid, platform);
  const imageHeight = ['100px', '140px', '180px'][
    Math.floor(Math.random() * 3)
  ];
  return (
    <WrapTouchableOpacity
      onPress={() => onPress(recipeid, platform, place)}
      activeOpacity={1}>
      <ImageButton
        key={recipeid}
        uri={uri}
        width="100%"
        height={imageHeight}
        onPress={() => onPress(recipeid, platform, place)}
        radius={10}
      />
      <FontContainer>
        <RecipeTitle>
          <Fonts
            children={
              title
                ? title.length > 18
                  ? title.slice(0, 18) + '...'
                  : title
                : '로딩중..'
            }
            color="black"
            size="medium"
            // padV="2px"
            bold
            lineHeight="mediumLarge"
          />
        </RecipeTitle>
        <RecipeInfo calories={calories} time={time} scrap={scrap} />
      </FontContainer>
    </WrapTouchableOpacity>
  );
};

export default RecipeTumbnail;

const FontContainer = styled(Divs)`
  padding-top: 10px;
  padding-left: 5px;
  height: auto;
`;

const RecipeTitle = styled.View`
  width: 90%;
`;

const WrapTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

interface RecipeThumbnailProps extends Recipe {
  onPress: (recipeid: number, platform: Platform, place: number) => void;
  place: number;
}
