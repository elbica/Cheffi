import React from 'react';
import styled from 'styled-components/native';
import { Section } from '../../assets/styles/theme';
import { ImageButton } from '../elements/Buttons';
import Divs, { RowDivs } from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { Star } from '../elements/Images';

export default function RecipeThumbmail({
  id,
  scrap,
  time,
  calories,
  title,
  onPress,
}: RecipeThumbnailProps) {
  return (
    <ImageButton
      uri={`https://cheffi.s3.ap-northeast-2.amazonaws.com/Image/Haemuk/${id}.jpg`}
      width="100%"
      height="200px"
      onPress={() => onPress(id)}
      marginV="1%">
      <FontContainer>
        <RecipeTitle>
          <Fonts
            children={title}
            color="white"
            size="xlarge"
            bold
            lineHeight="xlarge"
          />
        </RecipeTitle>
        <Section justify="flex-end" align="flex-end">
          <Fonts
            children={time === '분' ? '-분' : time}
            color="white"
            size="large"
            bold
          />
          <Fonts
            children={calories === 'Null' ? '- kcal' : calories}
            color="white"
            size="large"
            bold
          />
          <Scrap height="auto">
            <Star />
            <Fonts children={scrap} color="white" size="large" bold />
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
  onPress: (id: string) => void;
}
