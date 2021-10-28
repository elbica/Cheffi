import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { IMAGE_HAEMUK_URL, IMAGE_MANGAE_URL } from '../../config';
import { deleteUserScrap, putUserHistory, putUserScrap } from '../api';
import { isAndroid, vh } from '../assets/styles/theme';
import { Indicator } from '../components/elements/Indicators';
import RecipeContent from '../components/__recipeInfo/RecipeContent';
import RecipeImage from '../components/__recipeInfo/RecipeImage';
import { useRecipeInfo } from '../hooks/useRecipe';
import { useIsRecipeHistory, useIsRecipeScrap } from '../hooks/useRedux';
import { userRecipeHistory, userRecipeScrap } from '../redux/modules';

export default function RecipeInfoPage() {
  const route = useRoute<RecipeInfoRouteProp>();
  const { recipeid, platform, place } = route.params;
  const { data } = useRecipeInfo(recipeid);
  const isHistory = useIsRecipeHistory(recipeid);
  const dispatch = useDispatch();
  const isScrap = useIsRecipeScrap(recipeid);
  const onPress = () => {
    dispatch(userRecipeScrap(recipeid));
    isScrap ? deleteUserScrap(recipeid) : putUserScrap(recipeid, place);
  };

  useEffect(() => {
    dispatch(userRecipeHistory(recipeid));
    //화면이 뜨자마자, 기록에 없다면
    //레시피 열람 정보을 서버로 보내고, user redux history dispatch 한다.
    if (!isHistory) {
      putUserHistory(recipeid, place);
    }
  }, [recipeid]);
  const uri =
    platform === 'haemuk'
      ? `${IMAGE_HAEMUK_URL}/${recipeid}.jpg`
      : `${IMAGE_MANGAE_URL}/${recipeid}.png`;
  return (
    <View style={{ position: 'relative' }}>
      {data ? (
        <>
          <ScrapWrap onPress={onPress}>
            {isScrap ? (
              <CustomScrap
                source={require('../assets/icons/star.png')}
                resizeMode="contain"
              />
            ) : (
              <CustomScrap
                source={require('../assets/icons/star.png')}
                resizeMode="contain"
                imageStyle={{ tintColor: 'white' }}
              />
            )}
          </ScrapWrap>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: 'white' }}
            contentContainerStyle={{ flexGrow: 1 }}>
            <RecipeImage uri={uri} recipeid={data.recipeid} place={place} />
            <RecipeContent data={data} place={place} />
          </ScrollView>
        </>
      ) : (
        <Indicator />
      )}
    </View>
  );
}

const ScrapWrap = styled.TouchableOpacity`
  position: absolute;
  width: auto;
  z-index: 10;
  top: ${isAndroid ? 5 * vh : 7 * vh}px;
  right: 5%;
`;
const CustomScrap = styled.ImageBackground`
  shadow-color: black;
  shadow-opacity: 0.3;
  shadow-offset: 0 0;
  shadow-radius: 8px;
  width: 40px;
  height: 40px;
`;
