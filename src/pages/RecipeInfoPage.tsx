import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import { IMAGE_HAEMUK_URL, IMAGE_MANGAE_URL } from '../../config';
import { Indicator } from '../components/elements/Indicators';
import RecipeContent from '../components/__recipeInfo/RecipeContent';
import RecipeImage from '../components/__recipeInfo/RecipeImage';
import { useRecipeInfo } from '../hooks/useRecipe';

export default function RecipeInfoPage() {
  const route = useRoute<RecipeInfoRouteProp>();
  const { recipeid, platform } = route.params;
  const { data } = useRecipeInfo(recipeid);

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
          <RecipeImage uri={uri} {...data} />
          <RecipeContent data={data} />
        </ScrollView>
      ) : (
        <Indicator />
      )}
    </>
  );
}
