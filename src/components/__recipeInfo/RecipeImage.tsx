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
  place,
}: RecipeImageProps) {
  const isScrap = useIsRecipeScrap(recipeid);
  const dispatch = useDispatch();
  const onPress = () => {
    /**
     * @todo 스크랩 기록 서버로 보내기 rating은 3으로
     */
    dispatch(userRecipeScrap(recipeid));
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

interface RecipeImageProps {
  uri: string;
  recipeid: number;
  place: number;
}
