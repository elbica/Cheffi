import React from 'react';
import { ScrollView } from 'react-native';
import { IMAGE_HAEMUK_URL, IMAGE_MANGAE_URL } from '../../config';
import RecipeContent from '../components/__recipeInfo/RecipeContent';
import RecipeImage from '../components/__recipeInfo/RecipeImage';

export default function RecipeInfoPage({
  route: {
    params: { recipeid, platform },
  },
}) {
  const uri =
    platform === 'haemuk'
      ? `${IMAGE_HAEMUK_URL}/${recipeid}.jpg`
      : `${IMAGE_MANGAE_URL}/${recipeid}.png`;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <RecipeImage uri={uri} />
      <RecipeContent recipeid={recipeid} />
    </ScrollView>
  );
}
