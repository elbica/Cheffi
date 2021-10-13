import React from 'react';
import styled from 'styled-components/native';
import { getRecipeImageUri } from '../../api';
import { ImageButton } from '../elements/Buttons';
import Divs from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { Calories, Clock, EmptyStar } from '../elements/Images';

export default React.memo(function RecipeThumbmail({
  recipeid,
  scrap,
  time,
  calories,
  title,
  onPress,
  platform,
}: RecipeThumbnailProps) {
  const uri = getRecipeImageUri(recipeid, platform);
  // console.log('thumbnail: ', title);
  return (
    <WrapTouchableOpacity onPress={() => onPress(recipeid, platform)}>
      <ImageButton
        key={recipeid}
        uri={uri}
        width="100%"
        height="130px"
        onPress={() => onPress(recipeid, platform)}
        marginV="1%"
        radius={10}
      />
      <FontContainer>
        <RecipeTitle>
          <Fonts
            children={title ? title : '없음'}
            color="black"
            size="large"
            bold
            lineHeight="large"
          />
        </RecipeTitle>
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

const RecipeInfoWrap = styled.View`
  flex-direction: row;
  height: 40px;
`;

const InfoElementWrap = styled.View`
  width: auto;
  flex-direction: row;
  height: 100%;
  /* background-color: blue; */
  margin-right: 15px;
  align-items: center;
`;

const WrapTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  /* background-color: red; */
`;

interface RecipeThumbnailProps extends Recipe {
  onPress: (recipeid: number, platform: string) => void;
}
