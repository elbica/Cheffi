import React from 'react';
import { ScrollView } from 'react-native';
import { IMAGE_HAEMUK_URL } from '../../config';
import RecipeContent from '../components/__recipeInfo/RecipeContent';
import RecipeImage from '../components/__recipeInfo/RecipeImage';

export default function RecipeInfoPage({
  route: {
    params: { recipeid },
  },
}) {
  //   console.log(params);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <RecipeImage uri={`${IMAGE_HAEMUK_URL}/${recipeid}.jpg`} />
      <RecipeContent recipeid={recipeid} />
    </ScrollView>
  );
}
