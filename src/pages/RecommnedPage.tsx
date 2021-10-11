import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { AppWrap } from '../assets/styles/theme';
import { ChipButton } from '../components/elements/Buttons';
import RecipeThumbmail from '../components/__recommend/RecipeThumbnail';
import { useRecipeList } from '../hooks/useRecipe';
import { useRecipeCount, useRefrigerIngredient } from '../hooks/useRedux';

export default function RecommendPage() {
  const ingre = useRefrigerIngredient();
  const { data, isLoading } = useRecipeList(ingre);
  const recipeCount = useRecipeCount();
  const navigation = useNavigation();
  const onPress = (recipeid: number, platform: string) =>
    navigation.navigate('recipeInfo', { recipeid, platform });
  return (
    <AppWrap>
      <ChipButton
        color="light"
        children={`${recipeCount} 개의 레시피를 만들 수 있어요!`}
      />
      {!isLoading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <RecipeThumbmail {...item} onPress={onPress} />
          )}
          // renderItem={null}
          keyExtractor={item => item._id}
        />
      )}
    </AppWrap>
  );
}
