import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { AppWrap } from '../assets/styles/theme';
import { ChipButton } from '../components/elements/Buttons';
import RecipeThumbmail from '../components/__recommend/RecipeThumbnail';
import { useRecipeList } from '../hooks/useRecipe';
import { useRecipeCount } from '../hooks/useRedux';

export default function RecommendPage() {
  const { data, isLoading } = useRecipeList();
  // console.log('recommend', data, isLoading, isFetched);
  const recipeCount = useRecipeCount();
  const navigation = useNavigation();
  const onPress = (id: string) => navigation.navigate('recipeInfo', { id });
  // console.log(status, data, isLoading);
  return (
    <AppWrap>
      <ChipButton
        color="deepOrange"
        children={`${recipeCount} 개의 레시피를 만들 수 있어요!`}
      />
      {!isLoading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item: { ...rest } }) => (
            <RecipeThumbmail {...rest} onPress={onPress} />
          )}
          keyExtractor={item => item.id + item.title}
        />
      )}
    </AppWrap>
  );
}
