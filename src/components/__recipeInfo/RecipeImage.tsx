import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { deleteUserScrap, putUserScrap } from '../../api';
import { isAndroid, vh } from '../../assets/styles/theme';
import { useIsRecipeScrap } from '../../hooks/useRedux';
import { userRecipeScrap } from '../../redux/modules';
import { EmptyScrap, Scrap } from '../elements/Images';

export default function RecipeImage({
  uri,
  recipeid,
  place,
}: RecipeImageProps) {
  const isScrap = useIsRecipeScrap(recipeid);
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(userRecipeScrap(recipeid));
    isScrap ? deleteUserScrap(recipeid) : putUserScrap(recipeid, place);
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
  top: ${isAndroid ? 5 * vh : 7 * vh}px;
  right: 5%;
`;

interface RecipeImageProps {
  uri: string;
  recipeid: number;
  place: number;
}
