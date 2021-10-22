import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { vh } from '../../assets/styles/theme';
import { useIsRecipeScrap } from '../../hooks/useRedux';
import { userRecipeScrap } from '../../redux/modules';
import { EmptyScrap, Scrap } from '../elements/Images';

export default function RecipeImage({
  uri,
  recipeid,
  scrap,
  title,
  calories,
  time,
  platform,
}: {
  uri: string;
} & RecipeInfo) {
  const isScrap = useIsRecipeScrap(recipeid);
  const dispatch = useDispatch();
  const onPress = () => {
    /**
     * @todo popup 띄워서 별점 준 후 서버로 보내기
     */
    const param: Recipe = { recipeid, scrap, title, calories, time, platform };
    dispatch(userRecipeScrap(param));
  };
  return (
    <Position>
      <RecipeImageContainer source={{ uri: uri }} resizeMode="cover" />
      <ScrapWrap onPress={onPress}>
        {isScrap ? <Scrap /> : <EmptyScrap />}
      </ScrapWrap>
    </Position>
  );
}

const RecipeImageContainer = styled.Image`
  width: 100%;
  height: ${40 * vh}px;
`;
const Position = styled.View`
  position: relative;
`;

const ScrapWrap = styled.TouchableOpacity`
  position: absolute;
  /* background-color: red; */
  width: auto;
  top: ${7.5 * vh}px;
  right: 5%;
`;
