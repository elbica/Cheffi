import React from 'react';
import { ScrollView } from 'react-native';
import RecipeContent from '../components/__recipeInfo/RecipeContent';
import RecipeImage from '../components/__recipeInfo/RecipeImage';

export default function RecipeInfoPage({
  route: {
    params: { id },
  },
}) {
  //   console.log(params);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{ flexGrow: 1 }}>
      <RecipeImage
        uri={`https://cheffi.s3.ap-northeast-2.amazonaws.com/Image/Haemuk/${id}.jpg`}
      />
      <RecipeContent id={id} />
    </ScrollView>
  );
}
