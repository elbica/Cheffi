import React from 'react';
import styled from 'styled-components/native';
import { IMAGE_HAEMUK_URL } from '../../../config';
import { Section } from '../../assets/styles/theme';
import { ImageButton } from '../elements/Buttons';
import Divs, { RowDivs } from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { Star } from '../elements/Images';

export default function RecipeThumbmail({
  recipeid,
  scrap,
  time,
  calories,
  title,
  onPress,
}: RecipeThumbnailProps) {
  return (
    <ImageButton
      key={recipeid}
      uri={recipeid ? `${IMAGE_HAEMUK_URL}/${recipeid}.jpg` : 'dummy'}
      width="100%"
      height="200px"
      onPress={() => onPress(recipeid)}
      marginV="1%">
      <FontContainer>
        <RecipeTitle>
          <Fonts
            children={title ? title : '없음'}
            color="white"
            size="xlarge"
            bold
            lineHeight="xlarge"
          />
        </RecipeTitle>
        <Section justify="flex-end" align="flex-end">
          <Fonts
            children={time === '분' ? '- 분' : time}
            color="white"
            size="large"
            bold
          />
          <Fonts
            children={calories ? calories + ' kcal' : '- kcal'}
            color="white"
            size="large"
            bold
          />
          <Scrap height="auto">
            <Star />
            <Fonts
              children={scrap ? scrap.toString() : '0'}
              color="white"
              size="large"
              bold
            />
          </Scrap>
        </Section>
      </FontContainer>
    </ImageButton>
  );
}

const FontContainer = styled(Divs)`
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.2);
`;
const Scrap = styled(RowDivs)`
  justify-content: flex-end;
`;

const RecipeTitle = styled.View`
  width: 75%;
  /* background-color: red; */
`;

interface RecipeThumbnailProps extends Recipe {
  onPress: (recipeid: number) => void;
}
