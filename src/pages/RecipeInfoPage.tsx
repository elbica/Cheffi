import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { IMAGE_HAEMUK_URL, IMAGE_MANGAE_URL } from '../../config';
import { putUserHistory } from '../api';
import { Indicator } from '../components/elements/Indicators';
import RecipeContent from '../components/__recipeInfo/RecipeContent';
import RecipeImage from '../components/__recipeInfo/RecipeImage';
import { useRecipeInfo } from '../hooks/useRecipe';
import { useIsRecipeHistory } from '../hooks/useRedux';
import { userRecipeHistory } from '../redux/modules';

export default function RecipeInfoPage() {
  const route = useRoute<RecipeInfoRouteProp>();
  const { recipeid, platform, place } = route.params;
  const { data } = useRecipeInfo(recipeid);
  const isHistory = useIsRecipeHistory(recipeid);
  const dispatch = useDispatch();
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
    <>
      {data ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: 'white' }}
          contentContainerStyle={{ flexGrow: 1 }}>
          <RecipeImage uri={uri} recipeid={data.recipeid} place={place} />
          <RecipeContent data={data} place={place} />
        </ScrollView>
      ) : (
        <Indicator />
      )}
    </>
  );
}
